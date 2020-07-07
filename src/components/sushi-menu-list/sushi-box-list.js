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
    maxWidth: 500,
  },
}));

export default function SushiBoxList(props) {
  const { sushiBoxData } = props;
  const classes = useStyles();


  function renderSushiBoxDisplay(boxSize) {
    return (
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ButtonBase>
                <ThumbnailImageCrop src={sushiBoxList[boxSize]} alt={sushiBoxList[boxSize]} customClass="cover-cropped" size={180} />
              </ButtonBase>
            </Grid>
            <Grid item xs={6}>
              <h3>{capitalizeFirstLetter(boxSize)}</h3>
              <Typography variant="caption">{sushiBoxList[boxSize]}</Typography>

            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
  return (
    <div>
      {
        sushiBoxData && (
          sushiBoxData.map((box) => (
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ButtonBase>
                      <ThumbnailImageCrop src={box.image} alt={box.label} customClass="cover-cropped" size={180} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={6}>
                    <h3>{capitalizeFirstLetter(box.label)}</h3>
                    <Typography variant="caption">{`Contains maximum of ${box.maxContainNumber} sushi pieces`}</Typography>

                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))
        )
      }
    </div>
  );
}
