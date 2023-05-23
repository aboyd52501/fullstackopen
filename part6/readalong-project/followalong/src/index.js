import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
        return state - 1
    case 'ZERO':
        return 0
      default:
        return state
  }
}

const counterStore = createStore(counterReducer)
counterStore.subscribe(() => {
  console.log(`Count: ${counterStore.getState()}`)
})

function App() {

  const count = counterStore.getState()

  const inc =   e => counterStore.dispatch({ type: 'INC' })
  const dec =   e => counterStore.dispatch({ type: 'DEC' })
  const zero =  e => counterStore.dispatch({ type: 'ZERO' })

  return (
    <div className="App">
      <p>Count: <span className='countNumber'>{count}</span></p>
      <button onClick={inc}>Plus</button>
      <button onClick={dec}>Minus</button>
      <button onClick={zero}>Zero</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
counterStore.subscribe(renderApp)