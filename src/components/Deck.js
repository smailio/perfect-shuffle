import React from 'react';
import Card from './Card';
import _ from 'lodash';

const Deck = ({ rows, cols, toPick, picked, cardCount }) => (
  <div
    className="card-grid"
    style={{
      display: 'flex',
      flexFlow: 'column',
      flexGrow: 1,
      flexBasis: 0,
      padding: '2px 2px 2px 2px'
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        border: toPick === -1 ? '2px dashed white' : '2px dashed #444'
      }}
    >
      {_.range(rows).map(r => (
        <div
          key={r}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {_.range(cols).map(c => (
            <Card
              key={r * cols + c}
              isSelected={toPick === r * cols + c}
              isHidden={picked.includes(r * cols + c)}
              cardCount={cardCount}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Deck;
