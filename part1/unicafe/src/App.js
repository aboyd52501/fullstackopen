import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = ((good - bad) / total) || 0; // || 0 -> Prevent NaN from rendering
  const positive = (good / total) || 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name='good' handleClick={() => setGood(good + 1)} />
      <Button name='neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button name='bad' handleClick={() => setBad(bad + 1)} />
      <h1>Statistics</h1>
      <DisplayCounter name='good' value={good} />
      <DisplayCounter name='neutral' value={neutral} />
      <DisplayCounter name='bad' value={bad} />
      <DisplayCounter name="all" value={total} />
      <DisplayCounter name="average" value={average} />
      <DisplayCounter name="positive" value={positive} />
    </div>
  );
};

const DisplayCounter = ({name, value}) => (
  <div>
    <p>{name} {value}</p>
  </div>
);

const Button = ({name, handleClick}) => (
  <button onClick={handleClick}>
    {name}
  </button>
);

export default App