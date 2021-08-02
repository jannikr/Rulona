import React from "react";
import { Category } from "../types";
import {
  AddFavouriteCategoryAction,
  DeleteFavouriteCategoryAction,
  AppDispatch,
  AppState,
} from "../store/types";
import { connect } from "react-redux";
import {
  addFavouriteCategory,
  deleteFavouriteCategory,
} from "../store/actions";
import Favourite from "./Favourite";
import { Add, Remove } from "@material-ui/icons";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    category: Category;
  };

const FavouriteCategory: React.FC<Props> = (props) => {
  const {
    category,
    addFavouriteCategory,
    deleteFavouriteCategory,
    favouriteCategories,
  } = props;

  return (
    <Favourite
      element={category}
      favourites={favouriteCategories}
      addFavourite={addFavouriteCategory}
      deleteFavourite={deleteFavouriteCategory}
      addIcon={<Add />}
      deleteIcon={<Remove />}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppState) => {
  const { favouriteCategories } = state;
  return { favouriteCategories };
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addFavouriteCategory: (category: Category): AddFavouriteCategoryAction =>
    dispatch(addFavouriteCategory(category)),
  deleteFavouriteCategory: (
    category: Category
  ): DeleteFavouriteCategoryAction =>
    dispatch(deleteFavouriteCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteCategory);
