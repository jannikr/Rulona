import React from "react";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
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
      addIcon={<FavoriteBorder />}
      deleteIcon={<Favorite />}
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
