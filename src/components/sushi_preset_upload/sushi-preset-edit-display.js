import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

import RecipeIngredience from '../recipe_full_info/recipe-ingredience';
import RecipeTags from '../recipe_list/recipe-tags';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function SushiPresetEditDisplay(recipe) {
  const classes = useStyles();

  const [nameValue, updateNameValue] = useState(recipe.name);
  const [imgUrl, updateImgUrl] = useState(recipe.image);
  const [descriptionValue, updateDescriptionValue] = useState(recipe.description);
  const [tagsArray, updateTagsArray] = useState(recipe.tag);
  const [stepsArray, updateStepsArray] = useState(recipe.step);
  const [ingredienceArray, updateIngredienceArray] = useState(recipe.ingredient);
  const [openImageModal, setOpenImageModal] = useState(false);


  const renderSteps = (steps) => steps.map((step, index) => (
    <div>
      <span>{index + 1}</span>
      {' '}
      -
      {' '}
      <input
        value={stepsArray[index].description}
        placeholder="Enter a step"
        onChange={(e) => {
          const newArray = [...stepsArray];
          newArray[index].description = e.target.value;
          updateStepsArray(newArray);
        }}
        type="text"
      />
    </div>
  ));

  function handleUploadSubmit() {
    const newRecipeObject = {
      name: nameValue,
      image: imgUrl,
      description: descriptionValue,
      step: stepsArray,
      tag: tagsArray,
      ingredient: ingredienceArray,
    };
    recipe.uploadNewRecipeMethod(newRecipeObject);
  }

  function handleRecipeEdit() {
    const newRecipeObject = {
      name: nameValue,
      image: imgUrl,
      description: descriptionValue,
      step: stepsArray,
      tag: tagsArray,
      ingredient: ingredienceArray,
    };
    recipe.editCurrentRecipeMethod(newRecipeObject, recipe.toggleEditMode(false));
  }

  function handleOnClickAddSteps() {
    const newStepsArray = [...stepsArray, { description: '' }];
    updateStepsArray(newStepsArray);
  }

  function handleOpenImageModal() {
    setOpenImageModal(true);
  }

  function handleCloseImageModal() {
    setOpenImageModal(false);
  }


  return (
    <section className="recipe-full-info-card">
      <div className="recipe-banner-container">
        <div className="recipe-banner-background" style={{ backgroundImage: `url(${recipe.image})` }} />
        <div className="recipe-banner-content">
          <div className="return-link">
            <Link to="/">
              <h2>
                {' '}
                <ArrowBackRoundedIcon fontSize="large" />
                {' '}
              </h2>
            </Link>
          </div>
          {
            recipe.image
            && (
              <div className="recipe-info-cirlce-image-container" onClick={handleOpenImageModal}>
                <img
                  className="recipe-info-image"
                  src={imgUrl}
                  alt={`recipe ${imgUrl}`}
                />
              </div>
            )
          }
          <Modal
            aria-labelledby="upload-image-modal-label"
            aria-describedby="upload-image-modal-description"
            className={classes.modal}
            open={openImageModal}
            onClose={handleCloseImageModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openImageModal}>
              <div className={classes.paper}>
                <h2 id="upload-image-modal-label">Image Upload</h2>
                <p id="upload-image-modal-description">
                  Url:
                  {' '}
                  <input value={imgUrl} onChange={(e) => { updateImgUrl(e.target.value); }} />
                </p>

              </div>
            </Fade>
          </Modal>
          <div className="recipe-info-title">
            <h1><input value={nameValue} placeholder="Enter Recipe Name" onChange={(e) => { updateNameValue(e.target.value); }} type="text" /></h1>

            <RecipeTags tagsArray={tagsArray} isEditModeActive updateTagsArrayMethod={updateTagsArray} />

            <p><input value={descriptionValue} placeholder="Enter Recipe Description" onChange={(e) => { updateDescriptionValue(e.target.value); }} type="text" /></p>
          </div>
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item lg={6} sm={12}>
          {
            recipe.ingredient
            && <RecipeIngredience ingredienceArray={ingredienceArray} isEditModeActive updateIngredienceArrayMethod={updateIngredienceArray} />
          }
        </Grid>
        <Grid item lg={6} sm={12}>
          <div className="recipe-instructions">
            <h3>Steps</h3>
            <div>{stepsArray && renderSteps(stepsArray)}</div>
            <Button variant="outlined" component="span" aria-label="add" fullWidth onClick={handleOnClickAddSteps}>
              <AddIcon />
            </Button>
          </div>
        </Grid>
      </Grid>
      {
        recipe.Id
        && (
        <Button className="max-width" variant="contained" component="span" onClick={handleRecipeEdit}>
           Done
        </Button>
        )
      }
      {
        !recipe.Id
        && (
        <Button className="max-width" variant="contained" component="span" onClick={handleUploadSubmit}>
           Upload
        </Button>
        )
      }
    </section>
  );
}
