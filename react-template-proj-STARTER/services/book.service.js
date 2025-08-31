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
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY)
    .then(books => {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regExp.test(book.title))
      }

      if (filterBy.minPrice) {
        books = books.filter(book => (book.listPrice?.amount || 0) >= filterBy.minPrice)
      }

      return books
    })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', amount = 0, currencyCode = 'EUR', isOnSale = false)
{
    
  return {
    title,
    listPrice: { amount, currencyCode, isOnSale }
  }
}

function getDefaultFilter(filterBy = { txt: '', minPrice: 0 }) {
  return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    const titles = [
      'metus hendrerit',
      'placerat nisi',
      'suscipit tellus',
      'varius lorem',
      'eleifend augue',
      'urna pretium'
    ]
    const currencies = ['EUR', 'USD', 'ILS']

    for (let i = 0; i < 6; i++) {
      const title = titles[utilService.getRandomIntInclusive(0, titles.length - 1)]
      const amount = utilService.getRandomIntInclusive(30, 150)
      const currencyCode = currencies[utilService.getRandomIntInclusive(0, currencies.length - 1)]
      const isOnSale = Math.random() > 0.5
      books.push(_createBook(title, amount, currencyCode, isOnSale))
    }
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, amount = 50, currencyCode = 'EUR', isOnSale = false) {
  const book = getEmptyBook(title, amount, currencyCode, isOnSale)
  book.id = utilService.makeId()
  return book
}
