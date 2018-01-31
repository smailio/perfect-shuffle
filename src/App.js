import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { withState } from 'recompose';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import TextField from 'material-ui/TextField';
import MaskedInput from 'react-text-mask';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import InputAdornment from 'material-ui/es/Input/InputAdornment';
import humanizeDuration from 'humanize-duration';

class App extends Component {
  state = {
    rows: 2,
    cols: 5,
    numberOfGrids: 3,
    numberOfGridsY: 2,
    toPick: -1,
    picked: [],
    cards: _.range(2 * 5 * 3 * 2),
    allPicked: false,
    interval: 700,
    requestStopPicker: false,
    requestStartPicker: false,
    pickerIsRunning: false
  };

  pickCard = () => {
    let cards = this.state.cards;
    if (this.state.cards.length === 0) return;
    // if (cards.length === 0) {
    //   this.setState({ allPicked: true });
    //   return;
    // }
    console.debug('cards', cards.length, cards);
    let toPick = cards[_.random(cards.length - 1)];
    console.debug('toPick', toPick);

    let allPicked = cards.length === 0;

    if (this.state.toPick !== -1) {
      this.setState({
        ...this.state,
        toPick,
        picked: [...this.state.picked, this.state.toPick],
        cards: cards.filter(card => card !== toPick),
        allPicked
      });
    } else {
      this.setState({ toPick });
    }
  };

  pickAllRemainingCards = recCall => {
    if (this.state.pickerIsRunning && !recCall) {
      return;
    }
    if (recCall && this.state.requestStopPicker) {
      this.setState({ requestStopPicker: false, pickerIsRunning: false });
    } else {
      this.setState({ pickerIsRunning: true });
      console.log('pickCkard');
      this.pickCard();
      console.log('pickCkard Done');
      setTimeout(() => {
        if (
          this.state.picked.length <
          this.state.rows *
            this.state.cols *
            this.state.numberOfGrids *
            this.state.numberOfGridsY
        ) {
          console.log('this.state.picked.length', this.state.picked.length);
          console.log(
            'total',
            this.state.rows *
              this.state.cols *
              this.state.numberOfGrids *
              this.state.numberOfGridsY
          );
          this.pickAllRemainingCards(true);
        }
      }, this.state.interval);
    }
  };

  render() {
    const picked = this.state.picked;
    const toPick = this.state.toPick;
    const numberOfGrids = this.state.numberOfGrids;
    const numberOfGridsY = this.state.numberOfGridsY;
    const cols = this.state.cols;
    const rows = this.state.rows;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          flexFlow: 'column',
          height: '100%'
        }}
      >
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <GridSettings
            rows={this.state.rows}
            cols={this.state.cols}
            interval={this.state.interval}
            totalTime={this.state.cards.length * (110 + this.state.interval)}
            totalCards={this.state.cards.length}
            setInterval={newInterval => {
              if (newInterval > 0) this.setState({ interval: newInterval });
            }}
            requestStop={() => this.setState({ requestStopPicker: true })}
            requestRefresh={({
              rows,
              cols,
              numberOfGrids,
              numberOfGridsY,
              interval
            }) => {
              this.setState({
                ...this.state,
                rows,
                cols,
                numberOfGrids,
                numberOfGridsY,
                allPicked: false,
                toPick: -1,
                picked: [],
                // requestStopPicker: false,
                requestStartPicker: false,
                pickerIsRunning: false,
                cards: _.range(rows * cols * numberOfGrids * numberOfGridsY),
                requestStopPicker: this.state.pickerIsRunning,
                interval
              });
            }}
            pickerIsRunning={this.state.pickerIsRunning}
            pickAllRemainingCards={this.pickAllRemainingCards.bind(this, false)}
          />
        </div>
        <div style={{ flexGrow: 1, flexShrink: 1, display: 'flex' }}>
          <CardMultiGrid
            rows={rows}
            cols={cols}
            toPick={toPick}
            picked={picked}
            pickCard={this.pickCard}
            numberOfGrids={numberOfGrids}
            numberOfGridsY={numberOfGridsY}
          />
        </div>
      </div>
    );
  }
}

class TextMaskCustom extends React.Component {
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

const GridSettings = withState('settings', 'setGrid', {
  rows: 2,
  cols: 5,
  numberOfGrids: 3,
  numberOfGridsY: 2
})(
  ({
    requestRefresh,
    settings: { rows, cols, numberOfGrids, numberOfGridsY },
    setGrid,
    interval,
    setInterval,
    totalTime,
    totalCards,
    pickerIsRunning,
    requestStop,
    pickAllRemainingCards
  }) => (
    <div>
      <div
        className="padding5"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div className="padding5">
          <TextField
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                requestRefresh({
                  rows,
                  cols,
                  numberOfGrids,
                  numberOfGridsY,
                  interval
                });
                ev.preventDefault();
              } else return false;
            }}
            label="X cards"
            value={cols || ''}
            // type="number"
            onChange={e => {
              let newColsValue = Number(e.target.value);
              setGrid(s => ({
                rows,
                numberOfGrids,
                numberOfGridsY,
                cols: newColsValue || 0,
                interval
              }));
            }}
          />
        </div>
        <Icon className="padding5" color="action" style={{ fontSize: 30 }}>
          close
        </Icon>

        <div className="padding5">
          <TextField
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                requestRefresh({
                  rows,
                  cols,
                  numberOfGrids,
                  numberOfGridsY,
                  interval
                });
                ev.preventDefault();
              } else return false;
            }}
            label="Y cards"
            value={rows || ''}
            // type="number"
            InputProps={{
              inputComponent: TextMaskCustom
            }}
            onChange={e => {
              console.log('e.target', e.target);
              console.log('e.target.value', e.target.value.replace(/\D/, ''));
              let newRowsValue = Math.min(100, e.target.value);
              console.log('newRowsValue', newRowsValue);
              setGrid(s => ({
                cols,
                numberOfGrids,
                numberOfGridsY,
                rows: newRowsValue || 0,
                interval
              }));
            }}
          />
        </div>

        <Icon className="padding5" color="action" style={{ fontSize: 30 }}>
          close
        </Icon>
        <div className="padding5">
          <TextField
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                requestRefresh({
                  rows,
                  cols,
                  numberOfGrids,
                  numberOfGridsY,
                  interval
                });
                ev.preventDefault();
              } else return false;
            }}
            label="X decks"
            value={numberOfGrids || ''}
            // type="number"
            onChange={e => {
              let newNumberOfGrids = Number(e.target.value);
              setGrid(s => ({
                rows,
                cols,
                numberOfGridsY,
                numberOfGrids: newNumberOfGrids || 0,
                interval
              }));
            }}
          />
        </div>
        <Icon className="padding5" color="action" style={{ fontSize: 30 }}>
          close
        </Icon>
        <div className="padding5">
          <TextField
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                requestRefresh({
                  rows,
                  cols,
                  numberOfGrids,
                  numberOfGridsY,
                  interval
                });
                ev.preventDefault();
              } else return false;
            }}
            label="Y decks"
            value={numberOfGridsY || ''}
            onChange={e => {
              let newNumberOfGridsY = Number(e.target.value);
              setGrid(s => ({
                rows,
                cols,
                numberOfGrids,
                numberOfGridsY: newNumberOfGridsY || 0,
                interval
              }));
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div className="padding5">
          <TextField
            label="Interval"
            value={interval || ''}
            // type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">ms</InputAdornment>
            }}
            onChange={e => {
              let newInterval = Number(e.target.value);
              setInterval(newInterval);
            }}
            helperText={`${totalCards} cards in ${humanizeDuration(totalTime)}`}
          />
        </div>
        <div className="padding5" style={{ marginLeft: 15 }}>
          {!pickerIsRunning ? (
            <IconButton
              style={{ cursor: 'pointer' }}
              onClick={pickAllRemainingCards}
            >
              {/*&#9202;*/}
              <Icon>play_arrow</Icon>
            </IconButton>
          ) : (
            <IconButton style={{ cursor: 'pointer' }} onClick={requestStop}>
              {/*&#9202;*/}
              <Icon>pause</Icon>
            </IconButton>
          )}
        </div>
        <div className="padding5">
          <IconButton
            style={{ cursor: 'pointer' }}
            onClick={requestRefresh.bind(null, {
              rows,
              cols,
              numberOfGrids,
              numberOfGridsY,
              interval
            })}
          >
            <Icon color="action">replay</Icon>
            {/*&#8635;*/}
          </IconButton>
        </div>
      </div>
    </div>
  )
);

const Card = ({ isSelected, isHidden, cols, rows, numberOfGrids }) => (
  <div
    className={isSelected ? 'card' : 'card'}
    style={{
      margin: '6px 6px 6px 6px'
      // visibility: isHidden ? 'hidden' : 'visible'
    }}
  >
    <div
      className="face front"
      style={{
        display: 'grid',
        gridTemplateColumns: '10px auto 10px',
        gridTemplateRows: '10px auto 10px',
        width: 35,
        height: 70,
        borderColor: isSelected ? '#EF4836' : undefined,
        visibility: isHidden ? 'hidden' : 'visible',
        lineHeight: '10px'
      }}
    >
      <img
        style={{ display: 'block' }}
        height="10"
        width="10"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALISURBVGhD7ZjPi9NAFMcrHkTBkygKHrwoHgTxF3qRlZ0kjfgDxC2bSVq2m5l09eDBv2LRmx5E716EFT0p/hO7qLieRMQfFH/jD1wRur7ZvK4leSxNmkxTyQe+0GbevPed6SSZTqWkpKTk/4U5/inTDU7i19HCrF/YZnDx2uTilT0xvRUvjwZVL9hhuvIxaFkJBrIwVpvajs3FxuKtvYYrXnbNr4rLFwaf2Y1hxcT05DnDlZ9i5rvi8iMsqTMYXhyOTVzeCAZvxAzT6hhcXrPtSxuw+3Ax6/4+MPSUMLqm1H2hlhumGQ6Mi4uwLH5RBvsRDPyH5fk+ptPHWd/fbLpijjKVRnDT3z7dam3C9PnCJuUemPVnlJEBNV+dnNmFZfIBfvIqzPxXonhGEh8MHoxhuWxhPDgPj8jfdOHsBDf3T+YIG8tmg+nIcR3mu1KDMJ3gKJYfjJVtgXoBEYVyVjuTPRS8Oe8TyTVJ3EEb6WBecIROrE0dqz69H+0kB2bgOpFUq9S2A+0kBxIsRhPqltqmoJ3kQOdvVFKdUh7QTnJgCX2nkurUQAOAPcpzKqlmLaKd5MAL5RaRUKvgBXoT7SSHeeIElVSnqp48jnbSAWvwEZVYh2AFPEAb6bE9uRN+xvdUgZz1VtVGG4NhOP5hlTBSYG1x8a77GWZy9XNf4uKN5cpDWD4bcFN3Fwp0YgV7pE4lmBNMwRNs6d81sTTuyqZq640lBLnFXK5nSDCQg2DoKszqQri0xB+c4YcWl546obAcYUaMLTM3MFSb4foNFRv2gb7h8pyHe+0Kc/wDWGa4UHsoMJh+T6OTlTMiLr/EByA+qzYMKy5gthk136MmhhWTWq22Hp4gTwjjoaBNxWB48QCTImY6oqEcZPUDazS2gMF21DChtorFboVhXZL/zvDovKf6hF0LAJiajZrsQ7PYvaSkpGRkqVT+AuXizLVSkdOYAAAAAElFTkSuQmCC"
      />
      <div>&nbsp;</div>
      <img
        height="8"
        width="8"
        src="https://png.icons8.com/color/50/000000/filled-like.png"
      />
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <img
        height="10"
        width="10"
        src="https://png.icons8.com/color/50/000000/diamonds.png"
      />
      <div>&nbsp;</div>
      <img
        height="10"
        width="10"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPfSURBVGhD7VjfixVVHL+bRShRz0VKgQ+FiLZLraKx4p2Ze7FFU7rtnJlN9J4zs6AWqQ+CiPsQCD4JS4L6B/Tgk5YsYkkvQUS09RIFPQVRaKCm7vojUD/fud+7zb33u/fO7G29szgf+DD3zvl+v+fzPXPO95yZQo4cOXLkGB8ff6ro6rLt6QlL6S+I9JvuURubZRuOZwYsZX6yPfNwDk6V/KCfzbMJ2zWbMfIzgvgG4glNky27ZQtl37yMJG5IwiUimWuWW32J3bMDW+kzkuB2RDKn2T0bKJc/fBbr4h9JbHvqGwNh+AyH6T2KbvUNWWhnOqO713CY3qO2yGWhHZmlRW99EK4QRSagM7JrOYfJBrBGfpOEtiP5sHt2YHn6oCS2HS3ffMzu2YFVCV9AFfpbEizR8szVsu8/z+6PF1QqrRH9uqP0W5II7Av7JNEilR5jt1lQTIpNfSxIWaYdGCN4ylbmekzMA8zxb2wVuEND40+THV2RzI8xG5Gw+aHuEw2Oa1QUCzFjNteoT5zLXiS7rkHlkYLWO5AIEb/avtlO9rU9Rf8r2UVU+j6ua6PY8OlUJKK+uy3RdEpFoGmpA4mwnaRSjOtRqZ15pDQy9gqSvSi0iWQNUfKpQe8NGK12x3GR8LmJo3yIKna5pV2Zr2w/GEMSt1raOnMKsvpq6lIAgkpCsMTEKJ7Dwr0y+9/TVzDnP4/bpKXjapvlJQdGbUIKloZI5i/p97yp9AmWlxzdjt6CUOnzLC854HihJVDveYHlJQfm9EkhUCpincXXSOJdfy5ien7K8pLD8oOtUrCkxNS8tMndPVj/v/n9Xf1R1YrZpCUS2cLykiPapT39ixSwHZHAPTyJQ9EnIVVdX79f9IM3uaQfJpu4TyIq83OlUlnC8tKh5Ju3U3Wq9Lcl16xi90JRmZ31tqKnPb5dKHrBasT9rsG3DWsa9AZ2nx/wVHYgSNtPPHjkfzp+tdr88Q2jfyxm8wnfjkC25EO+8VjNRIzbjqq+y27dwVHhawh6tvnp8NTbO1TZ8xybNgDT4etZe6W/5NsNIF8ks695GuP/XVzPOqN6JZv+f6BjtqXCjTgYvmOPmlf5toh17+1fymJYnJ6hry3cLIJiUmzqo2fvKs3AOrD+S6LGoq83cfPiAeb28eZEaM1w8+IAlW6siT+aE8G93+ddQnuBome2tSTBxBF/mM2yDyzsOV+aUKEm2SzbsFQwJCXQyC43t8eAPgj9vlV4I2lXJ9uaSwaBDfCAJFym/ojdsgXbDQYbN8AOVOYOfcNi92xgOAyXYYQ/o2NIKsKHfDlMjhw5cjwxKBQeAQKasE5iAQLeAAAAAElFTkSuQmCC"
      />
    </div>
  </div>
);

const CardGrid = ({ rows, cols, toPick, picked }) => (
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
    {/*{toPick !== -1 && (*/}
    {/*<div style={{ textAlign: 'center' }}>*/}
    {/*X : {Math.floor(toPick / rows) + 1}*/}
    {/*Y : {toPick % rows + 1}*/}
    {/*</div>*/}
    {/*)}*/}
    <div
      style={{
        // flexGrow: 1,
        // flexBasis: 0,
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
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

const CardMultiGrid = ({
  rows,
  cols,
  numberOfGrids,
  numberOfGridsY,
  toPick,
  picked,
  pickCard
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
            <CardGrid
              key={gridNum}
              rows={rows}
              cols={cols}
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
export default App;
