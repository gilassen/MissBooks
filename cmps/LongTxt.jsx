const { useState } = React

export function LongTxt({ txt = '', length = 100 }) {
  const [isLong, setIsLong] = useState(false)
  if (!txt) return null

  const isShort = txt.length <= length
  const display = isLong || isShort ? txt : txt.slice(0, length) + '...'

  return (
    <p className="long-txt">
      {display}{' '}
      {!isShort && (
        <button
          type="button"
          className="link-btn"
          onClick={() => setIsLong(prev => !prev)}
        >
          {isLong ? 'Read less' : 'Read more'}
        </button>
      )}
    </p>
  )
}
