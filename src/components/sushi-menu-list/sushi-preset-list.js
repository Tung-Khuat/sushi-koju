import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 1500,
  },
  displayContainer: {
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    display: 'inline-block',
    width: 350,
  },
}));

export default function SushiPresetList(props) {
  const { sushiPresetList } = props;
  const classes = useStyles();

  return (
    <div className={classes.displayContainer}>
      {
        sushiPresetList && (
          sushiPresetList.map((preset) => (
            <ButtonBase className={classes.card}>
              <ThumbnailImageCrop src={preset.image} alt={preset.name} customClass="cover-cropped" size={250} />
              <h4>{`${preset.numberOfPieces ? `${preset.numberOfPieces} kpl` : ''} ${capitalizeFirstLetter(preset.name)}`}</h4>
              <p>{`${preset.price} €`}</p>
            </ButtonBase>
          ))
        )
      }
    </div>
  );
}
