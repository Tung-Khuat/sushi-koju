import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ThumbnailImageCrop from '../image_components/thumbnail-image-crop';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
  },
}));

export default function SushiMenuList(props) {
  const classes = useStyles();
  const { sushiMenu } = props;
  const [sushiOrderInputValues, setSushiOrderInputValues] = React.useState();
  const [sushiOrderArray, setSushiOrderArray] = React.useState();

  React.useEffect(() => {
    const intitialSushiOrderObject = sushiMenu.map((sushi) => ({
      [sushi.name]: 0,
    }));
    setSushiOrderInputValues(intitialSushiOrderObject);
  }, []);

  const handleChange = (name) => (event) => {
    if (event.target.value > -1 && event.target.value < 1000) {
      setSushiOrderInputValues({ ...sushiOrderInputValues, [name]: event.target.value });
    }
  };

  const handleOrderSubmit = () => {
    let sushiOrderFinalArray = [];
    for (const key in sushiOrderInputValues) {
      if (sushiOrderInputValues.hasOwnProperty(key)) {
        sushiOrderFinalArray = [...sushiOrderFinalArray, { name: key, amount: sushiOrderInputValues[key] }];
      }
    }
    setSushiOrderArray(sushiOrderFinalArray);
  };

  function renderSushiMenuItem(sushiMenuArray) {
    return (
      sushiMenuArray.map((sushi, i) => (
        <Grid key={i} item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ButtonBase>
                  <ThumbnailImageCrop src={sushi.image} alt={sushi.name} customClass="cover-cropped" size={180} />
                </ButtonBase>
              </Grid>
              <Grid item xs={6}>
                <h3>{sushi.name}</h3>
                <Typography variant="caption">{sushi.ingredience.map((ingredient) => (`${ingredient} `))}</Typography>
                {
                  sushiOrderInputValues && (
                  <TextField
                    id="order-number"
                    label="Order Number"
                    type="number"
                    value={sushiOrderInputValues[sushi.name]}
                    onChange={handleChange(sushi.name)}
                    min="0"
                    step="1"
                  />
                  )
                }
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))
    );
  }

  return (
    <Grid container spacing={1}>
      {renderSushiMenuItem(sushiMenu)}
      <Button className="max-width" variant="contained" component="span" onClick={handleOrderSubmit}>
         Order
      </Button>
      {
        sushiOrderArray && (
          sushiOrderArray.map((order) => (
            <div>{`${order.name}: ${order.amount} `}</div>
          ))
        )
      }
    </Grid>
  );
}
