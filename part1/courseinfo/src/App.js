
function App() {

  const course = 'Half Stack application development';
  const part1 =  {
    name: 'Fundamentals of React',
    exercises: 10
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14
  };

  return (
    <div>
      <Header course={course} />
      <Content
        course1={part1} 
        course2={part2}
        course3={part3}
      />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
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
      <Part part={props.course1.name} exercises={props.course1.exercises} />
      <Part part={props.course2.name} exercises={props.course2.exercises} />
      <Part part={props.course3.name} exercises={props.course3.exercises} />
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
