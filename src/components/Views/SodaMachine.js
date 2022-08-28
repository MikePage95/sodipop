import React, { useState, useEffect } from 'react';
import Button from '../Basic/Button';
import ProgressBar from '../Basic/ProgressBar';

const SodaMachine = ({ context, taunt, setScore, goalValue, onChange }) => {
  const firstClicks = Number(localStorage.getItem(`${context}-firstClicked`));
  const [firstClicked, setFirstClicked] = useState(firstClicks ?? 0);

  const secondClicks = Number(localStorage.getItem(`${context}-secondClicked`));
  const [secondClicked, setSecondClicked] = useState(secondClicks ?? 0);

  const thirdClicks = Number(localStorage.getItem(`${context}-thirdClicked`));
  const [thirdClicked, setThirdClicked] = useState(thirdClicks ?? 0);

  const savedProgress = Number(localStorage.getItem(`${context}-progress`));
  const [progress, setProgress] = useState(savedProgress ?? 0);

  const [disableGoal, setDisableGoal] = useState(false);

  useEffect(() => {
    if (context !== 'manual' && disableGoal) {
      if (goalValue - progress >= 125) {
        pour(2);
      } else if (goalValue - progress >= 75) {
        pour(1);
      } else if (goalValue - progress >= 25) {
        pour(0);
      }
    }
  });

  const pour = (val) => {
    const minVal = val * 50;
    const maxVal = minVal + 50;

    const add =
      context === 'auto'
        ? (minVal + maxVal) / 2
        : Math.round(Math.random() * (maxVal - minVal) + minVal);

    if (val === 0) {
      setFirstClicked(firstClicked + 1);
      localStorage.setItem(`${context}-firstClicked`, firstClicked + 1);
    } else if (val === 1) {
      setSecondClicked(secondClicked + 1);
      localStorage.setItem(`${context}-secondClicked`, secondClicked + 1);
    } else if (val === 2) {
      setThirdClicked(thirdClicked + 1);
      localStorage.setItem(`${context}-thirdClicked`, thirdClicked + 1);
    }

    if (progress + add > goalValue && context !== 'cpu') {
      taunt('Aww you messed!');
    }

    setProgress(progress + add);
    localStorage.setItem(`${context}-progress`, progress + add);

    if (context === 'cpu') {
      setScore({ cpuScore: progress + add, cpuClicks: clicks + 1 });
    } else {
      setScore({ score: progress + add, clicks: clicks + 1 });
    }
  };

  const start = () => {
    if (goalValue > 0) {
      reset(context);
      reset();
      setDisableGoal(true);
    } else {
      taunt('Please set a goal value!');
    }
  };

  const restart = () => {
    reset();
  };

  const reset = (context) => {
    setDisableGoal(false);
    setFirstClicked(0);
    localStorage.setItem(`${context}-firstClicked`, 0);
    setSecondClicked(0);
    localStorage.setItem(`${context}-secondClicked`, 0);
    setThirdClicked(0);
    localStorage.setItem(`${context}-thirdClicked`, 0);
    setProgress(0);
    localStorage.setItem(`${context}-progress`, 0);
    taunt('Try reach the target value in less clicks than the CPU!');
  };

  const startOpponent = () => {
    reset();
    setDisableGoal(true);
  };

  const clicks = Number(firstClicked + secondClicked + thirdClicked);

  return (
    <div className="soda-container">
      <div>
        {context !== 'cpu' && (
          <div>
            <label>
              Set target value:
              <input
                type="number"
                name="goal"
                onChange={onChange}
                value={goalValue}
                className="machine-input"
                disabled={disableGoal}
              />
            </label>
            <div>
              <button type="button" onClick={start}>
                Play
              </button>
              <button type="button" onClick={restart}>
                Restart
              </button>
            </div>
          </div>
        )}
        <label>
          Amount poured:
          <input
            type="number"
            name="progress"
            disabled
            value={progress}
            className="machine-input"
          />
        </label>
        <label>
          Number of clicks:
          <input
            type="number"
            name="clicks"
            disabled
            value={clicks}
            className="machine-input"
          />
        </label>
        {context === 'cpu' && (
          <button
            type="button"
            onClick={startOpponent}
            disabled={goalValue === 0}
          >
            Start CPU
          </button>
        )}
      </div>
      <ProgressBar progress={progress} total={goalValue}></ProgressBar>
      <div className="buttons-container">
        <Button
          label="0-50mls"
          value={firstClicked}
          pour={() => pour(0)}
          disabled={!disableGoal || context === 'cpu'}
        ></Button>
        <Button
          label="50-100mls"
          value={secondClicked}
          pour={() => pour(1)}
          disabled={!disableGoal || context === 'cpu'}
        ></Button>
        <Button
          label="100-150mls"
          value={thirdClicked}
          pour={() => pour(2)}
          disabled={!disableGoal || context === 'cpu'}
        ></Button>
      </div>
    </div>
  );
};

export default SodaMachine;
