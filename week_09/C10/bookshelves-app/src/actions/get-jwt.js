export function getJWT(email, password) {
  return {
    type: 'FETCH_TOKEN',
    payload: { email, password },
  }
}