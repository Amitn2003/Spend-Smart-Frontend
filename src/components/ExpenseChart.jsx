// import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// export default function ExpenseChart({ data }) {
//   console.log('Rendering ExpenseChart with data:', data.expenses);
//   const expenses = data.expenses || [];
//   const chartData = Object.entries(
//     expenses.reduce((acc, curr) => {
//       acc[curr.type] = (acc[curr.type] || 0) + curr.amount;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <>
//       <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}> 
//             {chartData.map((_, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip /> 
//         </PieChart>
//       </ResponsiveContainer>
//     </>
//   );
// }





import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Updated color palette for better accessibility
const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#8884d8'];

export default function ExpenseChart({ data }) {
  // console.log('Rendering ExpenseChart with data:', data.expenses);
  
  const expenses = data.expenses || [];
  const chartData = Object.entries(
    expenses.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + curr.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <>
      <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Expense Breakdown by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie 
            data={chartData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={120} 
            innerRadius={50} 
            paddingAngle={5} 
            isAnimationActive={true} // Enable animation for smooth transitions
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          {/* Tooltip with custom styling */}
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)', 
              borderRadius: '10px', 
              color: '#fff', 
              fontSize: '14px'
            }}
            formatter={(value) => `₹${value.toFixed(2)}`} // Formatting the value to add a currency symbol
            labelStyle={{ fontWeight: 'bold' }}
            cursor={false} // Hide cursor pointer inside chart
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

