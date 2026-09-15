
export default function AdminStats({ stats }) {
  return (
    <div className="cards">
      <div className="card">
        <h4>Total Users</h4>
        <p>{stats.users}</p>
      </div>

      <div className="card">
        <h4>Majors</h4>
        <p>{stats.majors}</p>
      </div>

      <div className="card">
        <h4>Tests Taken</h4>
        <p>{stats.tests}</p>
      </div>
    </div>
  );
}