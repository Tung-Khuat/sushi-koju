import React from 'react';
import { Store } from '../../store';
import { fetchSushiItemById, addPresetToCart} from '../../actions/action-sushi';
const SushiPresetFullInfoDisplay = React.lazy(() => import('./sushi-preset-full-info-display'));
import SushiPanel from '../navigation/sushi-panel';
import LoadingPlaceholder from '../loading_placeholders/loading-placeholders';

export default function SushiPresetFullInfoIndex(props) {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    fetchSushiItemById(dispatch, props.match.params.id);
  }, []);

  function addPresetToCartMethod(orderNumber, presetObject) {
    addPresetToCart(dispatch, orderNumber, presetObject)
  }

  return (
    <div>
      <SushiPanel hasCart hasLogo />
      <React.Suspense fallback={<LoadingPlaceholder />}>
        <SushiPresetFullInfoDisplay preset={state.currentPresetInfo} addPresetToCartMethod={addPresetToCartMethod} itemsInCart={state.itemsInCart}/>
      </React.Suspense>
    </div>
  );
}
