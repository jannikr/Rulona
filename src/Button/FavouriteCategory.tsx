import React from "react";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Favorite from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
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

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & { selectedCategory: Category };

const FavouriteCategory: React.FC<Props> = (props) => {
  const {
    selectedCategory,
    addFavouriteCategory,
    deleteFavouriteCategory,
    favouriteCategories,
  } = props;

  if (!selectedCategory) return <></>;

  if (favouriteCategories.includes(selectedCategory)) {
    return (
      <>
        <IconButton
          onClick={(): void => {
            deleteFavouriteCategory(selectedCategory);
          }}
        >
          <Favorite />
        </IconButton>
      </>
    );
  } else {
    return (
      <>
        <IconButton
          onClick={(): void => {
            addFavouriteCategory(selectedCategory);
          }}
        >
          <FavoriteBorder />
        </IconButton>
      </>
    );
  }
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
