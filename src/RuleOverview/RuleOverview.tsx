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
import EditMyCategoryDisplay from "./EditMyCategoryDisplay";
import Box from "@material-ui/core/Box";

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

  const [
    rulesPerFavouriteCategory,
    setRulesPerFavouriteCategory,
  ] = useState<RulesPerCategory>([]);

  const [showFavouriteCategory, setShowFavouriteCategory] = useState(false);

  const sortCategories = (categories: Category[]): Category[] => {
    return categories.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortRulesPerCategory = (
    rulesPerCategory: RulesPerCategory
  ): RulesPerCategory => {
    return rulesPerCategory.sort((a, b) => a[0].name.localeCompare(b[0].name));
  };

  const getNonFavouriteCategories = useCallback((): Category[] => {
    const nonFavouriteCategories: Category[] = [];
    for (const category of categories) {
      if (!favouriteCategories.includes(category)) {
        nonFavouriteCategories.push(category);
      }
    }
    return sortCategories(nonFavouriteCategories);
  }, [categories, favouriteCategories]);

  const mapRulesToFavouriteCategory = useCallback((): RulesPerCategory => {
    const rulesPerCategory = new Map<Category, Rule[]>();
    for (const rule of rules) {
      const category = sortCategories(favouriteCategories).find(
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
        sortCategories(categories).find(
          (category) => category.id === rule.categoryId
        ) || uncategorized;
      if (!favouriteCategories.includes(category)) {
        rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
        rulesPerCategory.get(category)?.push(rule);
      }
    }
    return Array.from(rulesPerCategory);
  }, [rules, categories, favouriteCategories, getNonFavouriteCategories]);

  const showFavouriteCategorySwitch = (): void => {
    setShowFavouriteCategory(!showFavouriteCategory);
  };

  const toCategoryDisplay = useCallback(
    ([category, rules]: [Category, Rule[]]): JSX.Element => (
      <CategoryDisplay key={category.id} category={category} rules={rules} />
    ),
    [showFavouriteCategory]
  );

  const toEditMyCategoryDisplay = useCallback(
    (category: Category): JSX.Element => (
      <EditMyCategoryDisplay key={category.id} category={category} />
    ),
    [showFavouriteCategory]
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
            <div>
              <div className={styles.row}>
                <h2 className={styles.headline}>Meine Kategorien</h2>
                <IconButton onClick={showFavouriteCategorySwitch}>
                  {showFavouriteCategory ? <Clear /> : <Edit />}
                </IconButton>
              </div>
              {!showFavouriteCategory && (
                <div>
                  {sortRulesPerCategory(rulesPerFavouriteCategory).map(
                    toCategoryDisplay
                  )}
                  <h2 className={styles.headline}>
                    Alle Regeln für {selectedPlace.name}
                  </h2>
                  {sortRulesPerCategory(rulesPerCategory).map(
                    toCategoryDisplay
                  )}
                </div>
              )}
              {showFavouriteCategory && (
                <div>
                  {favouriteCategories.map(toEditMyCategoryDisplay)}
                  <h2 className={styles.headline}> Kategorien</h2>
                  {getNonFavouriteCategories().map(toEditMyCategoryDisplay)}
                </div>
              )}
            </div>
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
