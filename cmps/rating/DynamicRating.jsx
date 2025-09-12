import { RateBySelect } from './RateBySelect.jsx'
import { RateByTextbox } from './RateByTextbox.jsx'
import { RateByStars } from './RateByStars.jsx'

export function DynamicRating({ type, val, onSelected }) {
  switch (type) {
    case 'textbox':
      return <RateByTextbox val={val} onSelected={onSelected} />
    case 'stars':
      return <RateByStars val={val} onSelected={onSelected} />
    case 'select':
    default:
      return <RateBySelect val={val} onSelected={onSelected} />
  }
}
