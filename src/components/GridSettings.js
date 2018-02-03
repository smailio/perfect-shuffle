import React from 'react';
import { withState } from 'recompose';
import humanizeDuration from 'humanize-duration';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import NumberInput from './NumberInput';
import { InputAdornment } from 'material-ui';

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
            onChange={e => {
              let newColsValue = Number(e.target.value);
              setGrid(() => ({
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
            InputProps={{
              inputComponent: NumberInput
            }}
            onChange={e => {
              let newRowsValue = Math.min(100, e.target.value);
              setGrid(() => ({
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
            onChange={e => {
              let newNumberOfGrids = Number(e.target.value);
              setGrid(() => ({
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
              setGrid(() => ({
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
              <Icon>play_arrow</Icon>
            </IconButton>
          ) : (
            <IconButton style={{ cursor: 'pointer' }} onClick={requestStop}>
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
          </IconButton>
        </div>
      </div>
    </div>
  )
);

export default GridSettings;
