import { useState } from 'react'

export const useField = (init = '') => {
  const [value, setValue] = useState(init)

  const onChange = event => {
    setValue(event.target.value)
  }
  
  const reset = () => setValue(init)
  
  return [
    {
      value,
      onChange,
    },
    reset
  ]
}