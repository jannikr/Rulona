import {
  Container,
  Dialog,
  DialogContent,
  Divider,
  Hidden,
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
import { Link } from "react-router-dom";
import TutorialDisplay from "./TutorialDisplay";
import ShareDialog from "./ShareDialog";
import ContentHeader from "../ContentHeader/ContentHeader";

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

  const getNonFavouriteCategories = useCallback((): Category[] => {
    const nonFavouriteCategories = categories.filter(
      (category) => !favouriteCategories.includes(category)
    );
    return nonFavouriteCategories;
  }, [categories, favouriteCategories]);

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

  const toggleFavouriteCategorySwitch = (): void => {
    setShowFavouriteCategory(!showFavouriteCategory);
  };

  const toCategoryDisplay = useCallback(
    ([category, rules]: [Category, Rule[]]): JSX.Element => (
      <CategoryDisplay key={category.id} category={category} rules={rules} />
    ),
    []
  );

  const toFavouriteCategoriesEditor = useCallback(
    (category: Category): JSX.Element => (
      <FavouriteCategoriesEditor key={category.id} category={category} />
    ),
    []
  );

  const byName = useCallback(
    (a: Category, b: Category): number => a.name.localeCompare(b.name),
    []
  );

  const byCategoryName = useCallback(
    (a: [Category, Rule[]], b: [Category, Rule[]]): number =>
      a[0].name.localeCompare(b[0].name),
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

  if (!selectedPlace)
    return (
      <>
        <div className={classnames(styles.container, styles.center)}>
          <TutorialDisplay />
        </div>
        <Hidden smUp={!selectedPlace}>
          <Dialog open={true}>
            <DialogContent>test</DialogContent>
          </Dialog>
        </Hidden>
      </>
    );

  return (
    <div className={styles.container}>
      <Box boxShadow={3}>
        <ContentHeader
          heading={selectedPlace.name}
          backLink="/rules"
          buttons={[
            <ShareDialog path={`${window.location.pathname}`} />,
            <FavouritePlace place={selectedPlace} />,
          ]}
        />
      </Box>
      <Divider />
      <Box mt={5} className={styles.content}>
        <Container maxWidth="sm">
          <PlaceInfoDisplay placeInfo={placeInfo} />
          {rules.length === 0 && (
            <p>Es gibt aktuell keine Regeln für {selectedPlace.name}.</p>
          )}
          {rules.length !== 0 && (
            <div>
              <div className={classnames(styles.row, styles.headlinemargin)}>
                <h2 className={styles.headline}>Meine Kategorien</h2>
                <IconButton onClick={toggleFavouriteCategorySwitch}>
                  {showFavouriteCategory ? <Clear /> : <Edit />}
                </IconButton>
              </div>
              {!showFavouriteCategory && (
                <div>
                  {rulesPerFavouriteCategory
                    .sort(byCategoryName)
                    .map(toCategoryDisplay)}
                  <div
                    className={classnames(styles.row, styles.headlinemargin)}
                  >
                    <h2 className={styles.headline}>
                      Alle Regeln für {selectedPlace.name}
                    </h2>
                  </div>
                  {rulesPerCategory.sort(byCategoryName).map(toCategoryDisplay)}
                </div>
              )}
              {showFavouriteCategory && (
                <div>
                  {favouriteCategories
                    .sort(byName)
                    .map(toFavouriteCategoriesEditor)}
                  <div
                    className={classnames(styles.row, styles.headlinemargin)}
                  >
                    <h2 className={styles.headline}>Alle Kategorien</h2>
                  </div>
                  {getNonFavouriteCategories()
                    .sort(byName)
                    .map(toFavouriteCategoriesEditor)}
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
