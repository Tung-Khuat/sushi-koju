import React from 'react';
import { postNewSushiPreset } from '../../actions/action-sushi';
import { Store } from '../../store';
import { sampleSushiPresetList } from '../../assets/data/sushi.js';

export default function SampleDataUpload() {
  const { state, dispatch } = React.useContext(Store);

  function uploadData(array) {
    array.map((sushiPreset) => {
      postNewSushiPreset(dispatch, sushiPreset);
    });
  }

  return (
    <>
      <button onClick={() => { uploadData(sampleSushiPresetList); }}> Sample data Upload </button>
    </>
  );
}
