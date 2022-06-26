
function App() {

  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        course1={part1} course1count={exercises1}
        course2={part2} course2count={exercises2}
        course3={part3} course3count={exercises3}
      />
      <Total exercises={exercises1 + exercises2 + exercises3} />
    </div>
  );
}

const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
);

const Content = (props) => (
  <div>
    <p>
      {props.course1} {props.course1count}
    </p>
    <p>
      {props.course2} {props.course2count}
    </p>
    <p>
      {props.course3} {props.course3count}
    </p>
  </div>
);

const Total = (props) => (
  <div>
    <p>Number of exercises {props.exercises}</p>
  </div>
);

export default App;
