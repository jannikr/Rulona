import {
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchRules,
  fetchPlaceInfo,
  fetchCategories,
  setRules,
  setPlaceInfo,
  fetchFavouriteCategories,
} from "../store/actions";
import {
  AppDispatch,
  AppState,
  SetCategoriesAction,
  SetPlaceInfoAction,
  SetRulesAction,
  SetFavouriteCategoriesAction,
} from "../store/types";
import { Category, Place, Rule, RulesPerCategory } from "../types";
import CategoryDisplay from "./CategoryDisplay";
import PlaceInfoDisplay from "./PlaceInfoDisplay";
import FavouritePlace from "../Button/FavouritePlace";
import styles from "./RuleOverview.module.css";
import { Clear, Edit } from "@material-ui/icons";
import FavouriteCategoriesEditor from "./FavouriteCategoriesEditor";
import Box from "@material-ui/core/Box";
import classnames from "classnames";
import SearchField from "../SearchField/SearchField";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const RuleOverview: React.FC<Props> = (props) => {
  const {
    rules,
    categories,
    selectedPlace,
    placeInfo,
    fetchRules,
    fetchPlaceInfo,
    fetchCategories,
    favouriteCategories,
    fetchFavouriteCategories,
    reset,
  } = props;

  const [rulesPerCategory, setRulesPerCategory] = useState<RulesPerCategory>(
    []
  );

  const [searchWord, setSearchWord] = useState<string>("");

  const [
    rulesPerFavouriteCategory,
    setRulesPerFavouriteCategory,
  ] = useState<RulesPerCategory>([]);

  const [
    rulesPerFilteredCategory,
    setRulesPerFilteredCategory,
  ] = useState<RulesPerCategory>([]);

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const [filteredRules, setFilteredRules] = useState<Rule[]>([]);

  const [showFavouriteCategory, setShowFavouriteCategory] = useState(false);

  const getNonFavouriteCategories = useCallback((): Category[] => {
    const nonFavouriteCategories = categories.filter(
      (category) => !favouriteCategories.includes(category)
    );
    return nonFavouriteCategories;
  }, [categories, favouriteCategories]);

  const [showCategories, setShowCategories] = useState(true);

  const mapRulesToFavouriteCategory = useCallback((): RulesPerCategory => {
    const rulesPerCategory = new Map<Category, Rule[]>();
    for (const rule of rules) {
      const category = favouriteCategories.find(
        (category) => category.id === rule.categoryId
      );
      if (!category) continue;
      rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
      rulesPerCategory.get(category)?.push(rule);
    }
    return Array.from(rulesPerCategory);
  }, [rules, favouriteCategories]);

  const mapRulesToCategory = useCallback((): RulesPerCategory => {
    const rulesPerCategory = new Map<Category, Rule[]>();
    const uncategorized: Category = { id: -1, name: "Ohne Kategorie" };
    for (const rule of rules) {
      const category =
        categories.find((category) => category.id === rule.categoryId) ||
        uncategorized;
      if (!favouriteCategories.includes(category)) {
        rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
        rulesPerCategory.get(category)?.push(rule);
      }
    }
    return Array.from(rulesPerCategory);
  }, [rules, categories, favouriteCategories]);

  const mapRulesToFilteredCategory = useCallback((): RulesPerCategory => {
    const rulesPerCategory = new Map<Category, Rule[]>();
    for (const category of filteredCategories) {
      rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
    }
    for (const rule of filteredRules) {
      const category = categories.find(
        (category) => category.id === rule.categoryId
      );
      if (!category) continue;
      rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
      rulesPerCategory.get(category)?.push(rule);
    }
    return Array.from(rulesPerCategory);
  }, [filteredRules, categories, filteredCategories]);

  const showFavouriteCategorySwitch = (): void => {
    setShowFavouriteCategory(!showFavouriteCategory);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") {
      setFilteredCategories([]);
      setFilteredRules([]);
      setShowCategories(true);
    } else {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setFilteredRules(
        rules.filter((rule) =>
          rule.text.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setShowCategories(false);
    }
    setSearchWord(e.target.value);
  };

  const toCategoryDisplay = useCallback(
    ([category, rules]: [Category, Rule[]]): JSX.Element => (
      <CategoryDisplay
        key={category.id}
        category={category}
        rules={rules}
        searchWord={searchWord}
      />
    ),
    [searchWord]
  );

  const toFavouriteCategoriesEditor = useCallback(
    (category: Category): JSX.Element => (
      <FavouriteCategoriesEditor key={category.id} category={category} />
    ),
    []
  );

  useEffect(() => {
    reset();
    if (!selectedPlace) return;
    fetchRules(selectedPlace);
    fetchPlaceInfo(selectedPlace);
  }, [selectedPlace, reset, fetchRules, fetchPlaceInfo]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setRulesPerCategory(mapRulesToCategory());
  }, [categories, rules, mapRulesToCategory]);

  useEffect(() => {
    fetchFavouriteCategories();
  }, [categories, fetchFavouriteCategories]);

  useEffect(() => {
    setRulesPerFavouriteCategory(mapRulesToFavouriteCategory());
  }, [favouriteCategories, rules, mapRulesToFavouriteCategory]);

  useEffect(() => {
    setRulesPerFilteredCategory(mapRulesToFilteredCategory());
  }, [filteredCategories, filteredRules, mapRulesToFilteredCategory]);

  useEffect(() => {
    setSearchWord(searchWord);
  }, [searchWord]);

  if (!selectedPlace) return <></>;

  return (
    <div>
      <Box boxShadow={3}>
        <Toolbar variant="dense" className={styles.toolbar}>
          <Typography className={styles.rulename}>
            {selectedPlace.name}
          </Typography>
          <div className={styles.icon}>
            <FavouritePlace place={selectedPlace} />
          </div>
        </Toolbar>
      </Box>
      <Divider />
      <Box mt={5}>
        <Container maxWidth="sm">
          <PlaceInfoDisplay placeInfo={placeInfo} />
          {rules.length === 0 && (
            <p>Es gibt aktuell keine Regeln für {selectedPlace.name}.</p>
          )}
          {rules.length !== 0 && (
            <>
              <SearchField onChange={search} />
              {showCategories ? (
                <>
                  <div
                    className={classnames(styles.row, styles.headlinemargin)}
                  >
                    <h2 className={styles.headline}>Meine Kategorien</h2>
                    <IconButton onClick={showFavouriteCategorySwitch}>
                      {showFavouriteCategory ? <Clear /> : <Edit />}
                    </IconButton>
                  </div>
                  {!showFavouriteCategory && (
                    <div>
                      {rulesPerFavouriteCategory
                        .sort((a, b) => a[0].name.localeCompare(b[0].name))
                        .map(toCategoryDisplay)}
                      <div
                        className={classnames(
                          styles.row,
                          styles.headlinemargin
                        )}
                      >
                        <h2 className={styles.headline}>
                          Alle Regeln für {selectedPlace.name}
                        </h2>
                      </div>
                      {rulesPerCategory
                        .sort((a, b) => a[0].name.localeCompare(b[0].name))
                        .map(toCategoryDisplay)}
                    </div>
                  )}
                  {showFavouriteCategory && (
                    <div>
                      {favouriteCategories
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(toFavouriteCategoriesEditor)}
                      <div
                        className={classnames(
                          styles.row,
                          styles.headlinemargin
                        )}
                      >
                        <h2 className={styles.headline}>Alle Kategorien</h2>
                      </div>
                      {getNonFavouriteCategories()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(toFavouriteCategoriesEditor)}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {rulesPerFilteredCategory
                    .sort((a, b) => a[0].name.localeCompare(b[0].name))
                    .map(toCategoryDisplay)}
                </>
              )}
            </>
          )}
        </Container>
      </Box>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const {
    rules,
    categories,
    favouriteCategories,
    selectedPlace,
    placeInfo,
  } = state;
  return { rules, categories, favouriteCategories, selectedPlace, placeInfo };
};
//
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  reset: (): void => {
    dispatch(setRules([]));
    dispatch(setPlaceInfo());
  },
  fetchRules: (place: Place): Promise<SetRulesAction> =>
    dispatch(fetchRules(place)),
  fetchPlaceInfo: (place: Place): Promise<SetPlaceInfoAction> =>
    dispatch(fetchPlaceInfo(place)),
  fetchCategories: (): Promise<SetCategoriesAction> =>
    dispatch(fetchCategories()),
  fetchFavouriteCategories: (): SetFavouriteCategoriesAction =>
    dispatch(fetchFavouriteCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RuleOverview);
