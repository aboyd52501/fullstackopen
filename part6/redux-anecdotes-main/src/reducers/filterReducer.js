
const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_CHANGE':
      return action.content
    default:
      return state
  }
}

export const filterChangeAction = text => ({
  type: 'FILTER_CHANGE',
  content: text
})

export default reducer