import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Store } from '../../store';
import { fetchSushiPresetList } from '../../actions/action-sushi';
import SushiPanel from '../navigation/sushi-panel';
import LoadingPlaceholder from '../loading_placeholders/loading-placeholders';
const SushiPresetList = React.lazy(() => import('./sushi-preset-list'));

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
      <React.Suspense fallback={<LoadingPlaceholder />}>
        <SushiPresetList sushiPresetList={props.sushiPresetList} />
      </React.Suspense>
    </div>
  );
}
