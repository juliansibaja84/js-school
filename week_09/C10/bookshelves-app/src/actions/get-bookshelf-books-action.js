export function getBookshelfBooks(bookshelf, apiInstance, user) {
  return {
    type: 'FETCH_BOOKS',
    payload: {bookshelf, apiInstance, user},
  }
}