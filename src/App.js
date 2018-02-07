import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import DeckGrid from './components/DeckGrid';
import GridSettings from './components/GridSettings';

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
    let toPick = cards[_.random(cards.length - 1)];

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
    const cardCount = this.state.cards.length;
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
            totalCards={cardCount}
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
          <DeckGrid
            rows={rows}
            cols={cols}
            toPick={toPick}
            picked={picked}
            pickCard={this.pickCard}
            numberOfGrids={numberOfGrids}
            numberOfGridsY={numberOfGridsY}
            cardCount={cardCount}
          />
        </div>
      </div>
    );
  }
}

export default App;
