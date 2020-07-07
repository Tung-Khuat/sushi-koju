import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Store } from '../../store';
import { fetchSushiPresetList } from '../../actions/action-sushi';
const SushiPresetList = React.lazy(() => import('./sushi-preset-list'));
import SampleDataUpload from './sample-sushi-data-button';
import SushiPanel from '../navigation/sushi-panel';
import LoadingPlaceholder from '../loading_placeholders/loading-placeholders';

const useStyles = makeStyles((theme) => ({
  displayContainer: {
    width: '100%',
  },
}));

export default function SushiPresetListIndex() {
  const { state, dispatch } = React.useContext(Store);
  const classes = useStyles();

  React.useEffect(() => {
    state.sushiPresetList.length === 0 && fetchSushiPresetList(dispatch);
  }, []);

  const props = {
    sushiPresetList: state.sushiPresetList,
  };

  return (
    <div className={classes.displayContainer}>
      <SushiPanel hasCart hasLogo />
      <React.Suspense fallback={<LoadingPlaceholder />}>
        <SushiPresetList sushiPresetList={props.sushiPresetList} />
      </React.Suspense>
    </div>
  );
}
