import { combineEpics } from 'redux-observable'

import { getBookshelfBooksEpic } from './get-bookshelf-books-epic';
import { getJWTEpic } from './get-jwt-epic';
import { searchBooksEpic } from './search-books-epic';
import { getUserInfoEpic } from './get-user-info-epic';



const rootEpic = combineEpics(
    getBookshelfBooksEpic,
    getJWTEpic,
    searchBooksEpic,
    getUserInfoEpic
);

export default rootEpic;