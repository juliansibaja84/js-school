export default function updateBooksList(updatedBooksList) {
  return {
    type: 'UPDATE_BOOKSLIST',
    payload: { updatedBooksList }
  }
};