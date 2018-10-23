export function getUserInfo(apiInstance) {
  return {
    type: 'FETCH_USER',
    payload: { apiInstance },
  }
}