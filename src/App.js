import React, { useState, useEffect } from 'react';
import './App.css';
import Tabs from './components/Basic/Tabs';
import SodaMachine from './components/Views/SodaMachine';

function App() {
  const [taunt, setTaunt] = useState(
    'Try reach the target value in less clicks than the CPU!'
  );

  const [score, setScore] = useState(false);

  const [goalValue, setGoalValue] = useState(0);

  useEffect(() => {
    const cpuDiff = Math.abs(goalValue - score?.cpuScore);
    const diff = Math.abs(goalValue - score?.score);

    if (goalValue === 0) {
      setTaunt('Try reach the target value in less clicks than the CPU!');
    } else if (cpuDiff > diff) {
      setTaunt('Nice!');
    } else if (diff > cpuDiff) {
      setTaunt('CPU got closer!');
    } else if (diff === cpuDiff && score.clicks > score.cpuClicks) {
      setTaunt('Efficient!');
    } else if (diff === cpuDiff && score.clicks < score.cpuClicks) {
      setTaunt('Not very efficient!');
    }
  }, [goalValue, score]);

  const changeTaunt = (text) => {
    setTaunt(text);
  };

  const onChange = (event) => {
    setGoalValue(event.target.value);
    localStorage.setItem('goal', event.target.value);
  };

  const setScores = (newScore) => {
    Object.keys(score).forEach((key) => {
      if (key in newScore) {
        score[key] = newScore[key];
      }
    });
    const newScores = { ...newScore, ...score };

    setScore(newScores);
  };

  return (
    <div className="App">
      <div className="tabs cpu-screen">
        <SodaMachine
          context="cpu"
          taunt={changeTaunt}
          setScore={setScores}
          goalValue={goalValue}
        ></SodaMachine>
      </div>
      <h1>{taunt}</h1>
      <Tabs>
        <div label="Manual">
          <SodaMachine
            context="manual"
            taunt={changeTaunt}
            setScore={setScores}
            goalValue={goalValue}
            onChange={onChange}
          ></SodaMachine>
        </div>
        <div label="Automatic">
          <SodaMachine
            context="auto"
            taunt={changeTaunt}
            setScore={setScores}
            goalValue={goalValue}
            onChange={onChange}
          ></SodaMachine>
        </div>
      </Tabs>
    </div>
  );
}

export default App;
