
function App() {

  const course = 'Half Stack application development';
  const parts =  [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content courses={parts} />
      <Total exercises={parts.reduce((acc, x) => acc + x.exercises, 0)} />
    </div>
  );
}

const Header = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => (
  <div>
      <Part course={props.courses[0]} />
      <Part course={props.courses[1]} />
      <Part course={props.courses[2]} />
  </div>
);

const Part = (props) => {
  return (
    <div>
      <p>
        {props.course.name} {props.course.exercises}
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
