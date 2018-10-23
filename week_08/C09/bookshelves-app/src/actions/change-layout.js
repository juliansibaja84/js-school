export default function changeLayout(layout) {
  return {
    type: 'CHANGE_LAYOUT',
    payload: { layout }
  }
}