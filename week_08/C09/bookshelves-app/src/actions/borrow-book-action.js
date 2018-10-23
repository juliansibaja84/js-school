export function borrowBook(bookId, bookList, index, apiInstance) {
  return (dispatch) => {
    dispatch(updateBookBegin());
    apiInstance.put(`/books/${bookId}/lend/`).then((response) => {
      let newBookList = [...bookList];
      newBookList[index] = response.data[0];
      dispatch(updateBookSuccess(newBookList));
      return newBookList;
    }).catch((error) => {
      dispatch(updateBookError(error))
    });
  }
}

export const UPDATE_BOOK_BEGIN   = 'UPDATE_BOOK_BEGIN';
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS';
export const UPDATE_BOOK_FAILURE = 'UPDATE_BOOK_FAILURE';

export const updateBookBegin = () => ({
  type: UPDATE_BOOK_BEGIN
});

export const updateBookSuccess = (books) => ({
  type: UPDATE_BOOK_SUCCESS,
  payload: { books }
});

export const updateBookError = error => ({
  type: UPDATE_BOOK_FAILURE,
  payload: { error }
});