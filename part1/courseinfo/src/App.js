
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
      <Part part={props.course1} exercises={props.course1count} />
      <Part part={props.course2} exercises={props.course2count} />
      <Part part={props.course3} exercises={props.course3count} />
  </div>
);

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Total = (props) => (
  <div>
    <p>Number of exercises {props.exercises}</p>
  </div>
);

export default App;
