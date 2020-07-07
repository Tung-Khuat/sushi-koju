import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';
import { capitalizeFirstLetter } from '../../assets/helpers/helper-functions-index';


const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '85%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
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
    <div className="platter-list-container">
      {
        sushiPresetList && (
          sushiPresetList.map((preset) => (
            <div className="platter-card" key={preset._id}>
              <Link to={`/product/${preset._id}`}>
                <ThumbnailImageCrop src={preset.image} alt={preset.name} customClass="cover-cropped" size={90} unit="%" />
                <h4>{capitalizeFirstLetter(preset.name)}</h4>
                <p>{`${preset.numberOfPieces} kpl - ${preset.price} €`}</p>
              </Link>
            </div>
          ))
        )
      }
    </div>
  );
}
