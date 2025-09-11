export function Chart({ data }) {
  return (
    <ul className="chart">
      {data.map(item => (
        <li key={item.title}>
          <span
            className="col"
            title={item.title}
            style={{ height: item.value + '%' }}
          >
            {item.value + '%'}
          </span>
          <div className="label">{item.title}</div>
        </li>
      ))}
    </ul>
  )
}
