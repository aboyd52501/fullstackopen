import { useState } from 'react';

const randInt = (min, max) => Math.floor(Math.random() * (max-min) + min);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const setRandom = () => setSelected(randInt(0, anecdotes.length));
  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const bestAnecdote = votes.reduce((iMax, x, i, arr) => {
    if (arr[iMax] < x)
      return i;
    else
      return iMax;
  }, 0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
        <br />
        has {votes[selected]} votes
        <br />
        <Button name="vote" onClick={vote} />
        <Button name="next anecdote" onClick={setRandom} />
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[bestAnecdote]}
        <br />
        has {votes[bestAnecdote]} votes
      </div>
    </div>
  );
}

const Button = ({name, onClick}) => (
  <button onClick={onClick}>{name}</button>
);



export default App;