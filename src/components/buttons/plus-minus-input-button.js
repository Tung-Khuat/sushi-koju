import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import {
  Add, Remove,
} from '@material-ui/icons';

export default function PlusMinusInputButton(props) {
  const {
    defaultInput, inputUnit, additionRenders, onInputChange, customClass,
  } = props;
  const [inputNumber, setInputNumber] = React.useState(defaultInput);

  React.useEffect(() => {
    // if theres a on change function in props
    if (onInputChange) {
      onInputChange(inputNumber);
    }
  }, [inputNumber]);

  function handleOnClick(isIncrement) {
    if (isIncrement) {
      setInputNumber(inputNumber + 1);
    } else if (inputNumber > 1) setInputNumber(inputNumber - 1);
  }

  return (
    <div className={`${customClass && customClass} plus-minus-number-container`}>
      <button variant="outlined" className="left-button" onClick={() => handleOnClick(false)}><Remove /></button>
      <input className="plus-minus-input" value={inputNumber} readOnly />
      <input className="unit-input" placeholder="kpl" disabled />
      <button variant="outlined" className="right-button" onClick={() => handleOnClick(true)}><Add /></button>
      {
        additionRenders && (
          additionRenders
        )
      }
    </div>
  );
}
