import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

import './index.css'

const store = createStore(reducer)

const createAction = action => () => store.dispatch({ type: action })

const App = () => {

  const goodF = createAction('GOOD')
  const okF = createAction('OK')
  const badF = createAction('BAD')
  const zeroF = createAction('ZERO')

  const currentState = store.getState()
  const good = currentState.good
  const ok = currentState.ok
  const bad = currentState.bad

  return (
    <div className='app-container'>
      <button onClick={goodF}>good</button> 
      <button onClick={okF}>ok</button> 
      <button onClick={badF}>bad</button>
      <button onClick={zeroF}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
