import React from 'react';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import MaskedInput from 'react-text-mask';

export default class NumberInput extends React.Component {
  render() {
    return (
      <MaskedInput
        {...this.props}
        mask={createNumberMask({ prefix: '', integerLimit: 100 })}
        placeholderChar={'_'}
        showMask
      />
    );
  }
}
