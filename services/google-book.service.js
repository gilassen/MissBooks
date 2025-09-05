export const googleBookService = {
  query,
}

function query(txt) {
  const sample = [
    {
      id: 'g1',
      volumeInfo: {
        title: 'The Three',
        authors: ['John Doe'],
        publishedDate: '2015',
        description: 'Sample description',
        pageCount: 240,
        categories: ['Fiction'],
        imageLinks: { thumbnail: 'https://picsum.photos/seed/g1/120/160' },
        language: 'en',
      },
    },
    {
      id: 'g2',
      volumeInfo: {
        title: 'The Three Musketeers',
        authors: ['Alexandre Dumas'],
        publishedDate: '1844',
        description: 'Classic novel',
        pageCount: 700,
        categories: ['Adventure'],
        imageLinks: { thumbnail: 'https://picsum.photos/seed/g2/120/160' },
        language: 'en',
      },
    },
  ]

  return new Promise(resolve => {
    setTimeout(() => resolve(sample), 300)
  })
}



// function query(txt) {
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(txt)}`
//   return fetch(url).then(res => {
//     if (!res.ok) throw new Error('Network error')
//     return res.json()
//   }).then(data => {
//     return (data && data.items) ? data.items.slice(0, 5) : []
//   })
// }

