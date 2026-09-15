export default function Table({ columns, data, actions }) {
  return (
    <table width="100%">
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
          {actions && <th>Actions</th>}
        </tr>
      </thead>

      <tbody>
        {data.map(row => (
          <tr key={row.id || row.userid}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}

            {actions && (
              <td>
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}