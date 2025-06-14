export default function ExpenseFilter({ categories, setFilter }) {
  // console.log('Rendering ExpenseFilter with categories:', categories);
  // console.log('Current filter:', setFilter);
  return (
    <select className="mb-4 border p-2" onChange={e => setFilter(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
