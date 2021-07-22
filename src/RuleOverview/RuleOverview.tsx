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

  const showFavouriteCategorySwitch = (): void => {
    if (!showFavouriteCategory) {
      setShowFavouriteCategory(true);
    } else {
      setShowFavouriteCategory(false);
    }
  };

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
      <Toolbar>
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
        <div className={styles.row}>
          {rules.length !== 0 && (
            <h4 className={styles.heading}>Meine Kategorien</h4>
          )}
          {rules.length !== 0 && (
            <IconButton
              onClick={(): void => {
                showFavouriteCategorySwitch();
              }}
            >
              {showFavouriteCategory ? <Clear /> : <Edit />}
            </IconButton>
          )}
        </div>
        {rulesPerFavouriteCategory.map(([category, rules]) => (
          <CategoryDisplay
            key={category.id}
            category={category}
            rules={rules}
            toggleFavourite={showFavouriteCategory}
          />
        ))}
        {rules.length !== 0 && <h4 className={styles.heading}> Kategorien</h4>}
        {rulesPerCategory.map(([category, rules]) => (
          <CategoryDisplay
            key={category.id}
            category={category}
            rules={rules}
            toggleFavourite={showFavouriteCategory}
          />
        ))}
      </Container>
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
