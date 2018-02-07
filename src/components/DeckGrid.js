import React from 'react';
import Deck from './Deck';
import _ from 'lodash';

const DeckGrid = ({
  rows,
  cols,
  numberOfGrids,
  numberOfGridsY,
  toPick,
  picked,
  pickCard,
  cardCount
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap',
      outline: 'none',
      flexFlow: 'column',
      zoom:
        100 -
        20 *
          numberOfGrids *
          (numberOfGridsY * numberOfGridsY * numberOfGridsY) /
          4 +
        '%'
    }}
    onKeyDown={pickCard}
    onClick={pickCard}
    tabIndex="1"
  >
    {_.range(numberOfGridsY).map(y => (
      <div
        key={y}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          outline: 'none'
        }}
      >
        {_.range(numberOfGrids)
          .map(n => numberOfGrids * y + n)
          .map(gridNum => (
            <Deck
              key={gridNum}
              rows={rows}
              cols={cols}
              cardCount={cardCount}
              toPick={
                getGridNumber(rows, cols, toPick) === gridNum
                  ? toPick - gridNum * rows * cols
                  : -1
              }
              picked={picked
                .filter(
                  cardNumber =>
                    getGridNumber(rows, cols, cardNumber) === gridNum
                )
                .map(cardNumber => cardNumber - gridNum * rows * cols)}
              pickCard={pickCard}
            />
          ))}
      </div>
    ))}
  </div>
);

function getGridNumber(rows, cols, cardNumber) {
  return Math.floor(cardNumber / (rows * cols));
}

export default DeckGrid;
