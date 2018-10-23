export default function setApiInstance(apiInstance) {
  return {
    type: 'SET_API_INSTANCE',
    payload: { apiInstance }
  }
}