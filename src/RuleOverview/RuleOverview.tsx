import { Container, Divider, Toolbar, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchRules,
  fetchPlaceInfo,
  fetchCategories,
  setRules,
  setPlaceInfo,
} from "../store/actions";
import {
  AppDispatch,
  AppState,
  SetCategoriesAction,
  SetPlaceInfoAction,
  SetRulesAction,
} from "../store/types";
import { Category, Place, Rule, RulesPerCategory } from "../types";
import CategoryDisplay from "./CategoryDisplay";
import PlaceInfoDisplay from "./PlaceInfoDisplay";
import FavouritePlace from "../Button/FavouritePlace";
import styles from "./RuleOverview.module.css";

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
    reset,
  } = props;

  const [rulesPerCategory, setRulesPerCategory] = useState<RulesPerCategory>(
    []
  );

  const mapRulesToCategory = useCallback((): RulesPerCategory => {
    const rulesPerCategory = new Map<Category, Rule[]>();
    const uncategorized: Category = { id: -1, name: "Ohne Kategorie" };
    for (const rule of rules) {
      const category =
        categories.find((category) => category.id === rule.categoryId) ||
        uncategorized;
      rulesPerCategory.get(category) || rulesPerCategory.set(category, []);
      rulesPerCategory.get(category)?.push(rule);
    }
    return Array.from(rulesPerCategory);
  }, [rules, categories]);

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

  if (!selectedPlace) return <></>;

  return (
    <div>
      <Toolbar variant="dense" className={styles.toolbar}>
        <Typography className={styles.rulename}>
          {selectedPlace.name}
        </Typography>
        <FavouritePlace />
      </Toolbar>
      <Divider />
      <Container>
        <PlaceInfoDisplay placeInfo={placeInfo} />
        {rules.length === 0 && (
          <p>Es gibt aktuell keine Regeln für {selectedPlace.name}.</p>
        )}
        {rulesPerCategory.map(([category, rules]) => (
          <CategoryDisplay
            key={category.id}
            category={category}
            rules={rules}
          />
        ))}
      </Container>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { rules, categories, selectedPlace, placeInfo } = state;
  return { rules, categories, selectedPlace, placeInfo };
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RuleOverview);
