import React from 'react';
import { postNewRecipe } from '../../actions/action-recipe';
import { Store } from '../../store';
import RecipeEditModeDisplay from './recipe-edit-mode-display';

const displayPlaceholderData = {
  name: '',
  description: '',
  tag: [
    '',
  ],
  ingredient: [

  ],
  step: [

  ],
  image: 'https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg',
};

export default function RecipeUploadIndex() {
  const { state, dispatch } = React.useContext(Store);

  function successHandler() {
    alert('Successfully created a new recipe');
  }

  function uploadNewRecipe(recipeObject) {
    postNewRecipe(dispatch, recipeObject, successHandler);
  }

  return (
    <>
      <RecipeEditModeDisplay {...displayPlaceholderData} uploadNewRecipeMethod={uploadNewRecipe} />
    </>
  );
}
