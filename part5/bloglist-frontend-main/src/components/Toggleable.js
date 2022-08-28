import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideVisible = { display: visible ? 'none' : '' }
  const showVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  const openLabel = props.openLabel || 'Open'
  const closeLabel = props.cancelLabel || 'Cancel'

  return (
    <div>
      <div style={hideVisible}>
        <button onClick={toggleVisibility}>{openLabel}</button>
      </div>
      <div style={showVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{closeLabel}</button>
      </div>
    </div>
  )
})

export default Toggleable