export default class Book {
  constructor(
    isbn,
    lended = false,
    user = '',
    recommendedBy = [],
    title = '',
    authors = '',
    image = '',
    description = '',
    averageRating = 0,
    publishedDate = '',
    pageCount = 0,
  ) {
    this.isbn = isbn;
    this.title = title;
    this.authors = authors;
    this.image = image;
    this.description = description;
    this.averageRating = averageRating;
    this.publishedDate = publishedDate;
    this.pageCount = pageCount;
    this.lended = lended;
    this.user = user;
    this.recommendedBy = recommendedBy;
  }
}
