import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getNextBookId,
  getPrevBookId,
  addReview,
  removeReview,
}



function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then(books => {
    const idx = books.findIndex(book => book.id === bookId)
    const nextIdx = (idx + 1) % books.length
    return books[nextIdx].id
  })
}

function getPrevBookId(bookId) {
  return storageService.query(BOOK_KEY).then(books => {
    const idx = books.findIndex(book => book.id === bookId)
    const prevIdx = (idx - 1 + books.length) % books.length
    return books[prevIdx].id
  })
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(books => {
    let res = books

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      res = res.filter(book => regExp.test(book.title))
    }

    if (filterBy.minPrice) {
      res = res.filter(book => ((book.listPrice && book.listPrice.amount) || 0) >= filterBy.minPrice)
    }

    if (filterBy.maxPrice) {
      res = res.filter(book => ((book.listPrice && book.listPrice.amount) || 0) <= filterBy.maxPrice)
    }

    if (filterBy.onSale) {
      res = res.filter(book => book.listPrice && !!book.listPrice.isOnSale)

    }

    if (filterBy.publishedAfter) {
      res = res.filter(book => (book.publishedDate || 0) >= +filterBy.publishedAfter)
    }

    return res
  })
}

function get(bookId) {
  return storageService.query(BOOK_KEY).then(books => {
    const idx = books.findIndex(book => book.id === bookId)
    if (idx === -1) return Promise.reject('Book not found')

    const book = books[idx]
    const prevBook = books[(idx - 1 + books.length) % books.length]
    const nextBook = books[(idx + 1) % books.length]

    return {
      ...book,
      prevBookId: prevBook.id,
      nextBookId: nextBook.id,
    }
  })
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) return storageService.put(BOOK_KEY, book)
  else return storageService.post(BOOK_KEY, book)
}

function getEmptyBook(title = '', amount = 0, currencyCode = 'EUR', isOnSale = false) {
  return {
    title,
    listPrice: { amount, currencyCode, isOnSale },
  }
}

function getDefaultFilter(filterBy = { txt: '', minPrice: 0, maxPrice: 0, onSale: false, publishedAfter: '' }) {
  return {
    txt: filterBy.txt,
    minPrice: filterBy.minPrice,
    maxPrice: filterBy.maxPrice,
    onSale: filterBy.onSale,
    publishedAfter: filterBy.publishedAfter,
  }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (books && books.length) return

  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
  books = []

  for (let i = 0; i < 20; i++) {
    const book = {
      id: utilService.makeId(),
      title: utilService.makeLorem(2),
      subtitle: utilService.makeLorem(4),
      authors: [utilService.makeLorem(1)],
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: utilService.makeLorem(20),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: utilService.getRandomIntInclusive(80, 500),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
      reviews: [],
    }
    books.push(book)
  }

  utilService.saveToStorage(BOOK_KEY, books)
}


function addReview(bookId, review) {
  const newReview = {
    id: utilService.makeId(),
    fullname: review.fullname,
    rating: Number(review.rating) || 1,
    readAt: review.readAt || ''
  }

  return get(bookId).then(book => {
    const bookToSave = { ...book }
    delete bookToSave.prevBookId
    delete bookToSave.nextBookId

    if (!Array.isArray(bookToSave.reviews)) bookToSave.reviews = []
    bookToSave.reviews = [newReview, ...bookToSave.reviews]

    return save(bookToSave).then(() => newReview)
  })
}

function removeReview(bookId, reviewId) {
  return get(bookId).then(book => {
    const bookToSave = { ...book }
    delete bookToSave.prevBookId
    delete bookToSave.nextBookId

    if (!Array.isArray(bookToSave.reviews)) bookToSave.reviews = []
    bookToSave.reviews = bookToSave.reviews.filter(r => r.id !== reviewId)

    return save(bookToSave)
  })
}
