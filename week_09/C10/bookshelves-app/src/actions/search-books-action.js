export function searchBooks(searchString, apiInstance) {
  return {
    type: 'SEARCH_BOOKS',
    payload: { apiInstance, searchString },
  }
}