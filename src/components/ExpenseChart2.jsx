// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// export default function ExpenseChart2({ data }) {
//   console.log('Rendering ExpenseChart2 with data:', data.expenses);

//   const expenses = data.expenses || [];
  
//   // Filter out the expenses data (remove income)
//   const expenseData = expenses.filter(item => item.type === 'expense');
  
//   // Calculate total amount for each category
//   const chartData = Object.entries(
//     expenseData.reduce((acc, curr) => {
//       acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
//       return acc;
//     }, {})
//   ).map(([name, value]) => ({ name, value }));

//   return (
//     <>
//       <h2 className="text-xl font-bold mb-2">Expense Breakdown by Category</h2>
//       <ResponsiveContainer width="100%" height={300}> {/* Adjust height for bar chart */}
//         <BarChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="value" fill="#FF8042" />
//         </BarChart>
//       </ResponsiveContainer>
//     </>
//   );
// }






import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Text } from 'recharts';

// Updated, more visually distinct color palette
const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#8884d8'];

export default function ExpenseChart2({ data }) {
  // console.log('Rendering ExpenseChart2 with data:', data.expenses);

  const expenses = data.expenses || [];

  // Filter out the expenses data (remove income)
  const expenseData = expenses.filter(item => item.type === 'expense');

  // Calculate total amount for each category
  const chartData = Object.entries(
    expenseData.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Expense Breakdown by Category</h2>
      <ResponsiveContainer width="100%" height={400}> {/* Increased height for better visibility */}
        <BarChart data={chartData}>
          {/* Smooth grid lines */}
          <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />

          {/* X and Y Axis with custom labels */}
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#555' }} />
          <YAxis tick={{ fontSize: 14, fill: '#555' }} />
          
          {/* Tooltip customizations */}
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '5px' }} 
            itemStyle={{ color: '#fff', fontWeight: 'bold' }} 
            formatter={(value) => `₹${value.toFixed(2)}`} 
          />
          
          {/* Bar with smooth transitions and responsive fill color */}
          <Bar 
            dataKey="value" 
            fill="#FF8042" 
            radius={[5, 5, 0, 0]} 
            isAnimationActive={true} 
            animationDuration={1000}
          />

          {/* Add a legend to differentiate data */}
          <Legend wrapperStyle={{ marginTop: 20, fontSize: 14, fontWeight: '500' }} />

          {/* Optional: Add text labels inside the bars */}
          {chartData.map((entry, index) => (
            <Text 
              key={`text-${index}`} 
              x={index * 70 + 30} 
              y={300 - entry.value} 
              fill="#fff" 
              fontSize="14" 
              textAnchor="middle"
              dy={-5}
            >
              ${entry.value.toFixed(2)}
            </Text>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
