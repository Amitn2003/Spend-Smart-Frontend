// import React from 'react'

// const Home = () => {
//   return (

//     <>
  
//   {/* Hero Section */}
//   <section className="pt-32 pb-20 bg-indigo-50">
//     <div className="container mx-auto px-6 text-center">
//       <h2 className="text-4xl font-bold text-gray-800 mb-4">
//         Take Control of Your Finances
//       </h2>
//       <p className="text-lg text-gray-600 mb-6">
//         Track your expenses, manage your budget, and achieve your savings goals
//         — all in one powerful platform.
//       </p>
//       <a
//         href="/register"
//         className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700"
//       >
//         Get Started for Free
//       </a>
//     </div>
//   </section>
//   {/* Features Section */}
//   <section id="features" className="py-20 bg-white">
//     <div className="container mx-auto px-6">
//       <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
//       <div className="grid md:grid-cols-3 gap-10 text-center">
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">📊</div>
//           <h4 className="text-xl font-semibold mb-2">Expense Tracking</h4>
//           <p className="text-gray-600">
//             Track every dollar you spend with easy categorization and real-time
//             updates.
//           </p>
//         </div>
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">💰</div>
//           <h4 className="text-xl font-semibold mb-2">Smart Budgeting</h4>
//           <p className="text-gray-600">
//             Set monthly budgets, monitor progress, and get alerts to stay on
//             track.
//           </p>
//         </div>
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">📱</div>
//           <h4 className="text-xl font-semibold mb-2">Cross-Platform Access</h4>
//           <p className="text-gray-600">
//             Use it on your phone, tablet, or desktop — your data stays in sync
//             everywhere.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* How It Works */}
//   <section id="how-it-works" className="py-20 bg-indigo-100">
//     <div className="container mx-auto px-6">
//       <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
//       <div className="grid md:grid-cols-3 gap-10 text-center">
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">📝</div>
//           <h4 className="text-xl font-semibold mb-2">1. Sign Up</h4>
//           <p className="text-gray-700">
//             Create your free account in seconds. No credit card required.
//           </p>
//         </div>
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">🔗</div>
//           <h4 className="text-xl font-semibold mb-2">2. Link Accounts</h4>
//           <p className="text-gray-700">
//             Securely link your bank accounts to automatically import
//             transactions.
//           </p>
//         </div>
//         <div>
//           <div className="text-indigo-600 text-4xl mb-4">📈</div>
//           <h4 className="text-xl font-semibold mb-2">3. Get Insights</h4>
//           <p className="text-gray-700">
//             Visualize your spending, get smart alerts, and grow your savings.
//           </p>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* Testimonials */}
//   <section id="testimonials" className="py-20 bg-white">
//     <div className="container mx-auto px-6">
//       <h3 className="text-3xl font-bold text-center mb-12">
//         What Our Users Say
//       </h3>
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="bg-gray-100 p-6 rounded-lg">
//           <p className="italic mb-4">
//             "BudgetWise changed how I manage money. I finally feel in control of
//             my finances."
//           </p>
//           <h5 className="font-semibold text-indigo-600">— Sayak A.</h5>
//         </div>
//         <div className="bg-gray-100 p-6 rounded-lg">
//           <p className="italic mb-4">
//             "Super intuitive and clean UI. I check it every day to stay on
//             track!"
//           </p>
//           <h5 className="font-semibold text-indigo-600">— Jit G.</h5>
//         </div>
//       </div>
//     </div>
//   </section>
//   {/* Call to Action */}
//   <section className="bg-indigo-600 text-white py-20 text-center">
//     <div className="container mx-auto px-6">
//       <h3 className="text-3xl font-bold mb-4">Ready to Master Your Money?</h3>
//       <p className="mb-6">
//         Join thousands of users already taking control of their budgets.
//       </p>
//       <a
//         href="/register"
//         className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
//       >
//         Create Free Account
//       </a>
//     </div>
//   </section>
//   {/* Footer */}
//   <footer className="bg-gray-900 text-white py-8">
//     <div className="container mx-auto px-6 text-center">
//       <p className="mb-2">© 2025 BudgetWise. All rights reserved.</p>
//       <div className="space-x-4">
//         <a href="/login" className="hover:underline">
//           Login
//         </a>
//         <a href="/register" className="hover:underline">
//           Register
//         </a>
//         <a href="#features" className="hover:underline">
//           Features
//         </a>
//       </div>
//     </div>
//   </footer>
// </>

//   )
// }

// export default Home







import React from 'react'
import { useAuth } from '../context/AuthContext'; // Assuming you're using AuthContext to track user login state

const Home = () => {
  const { token, user } = useAuth(); // Assuming useAuth() gives you token and user

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-indigo-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Track your expenses, manage your budget, and achieve your savings goals
            — all in one powerful platform.
          </p>
          {/* Conditional CTA */}
          <a
            href={token && user ? "/dashboard" : "/register"}  // Redirect to Dashboard if logged in, else Register
            className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700"
          >
            {token && user ? "Track Expenses" : "Get Started for Free"}
          </a>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-indigo-600 text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-2">Expense Tracking</h4>
              <p className="text-gray-600">
                Track every dollar you spend with easy categorization and real-time
                updates.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 text-4xl mb-4">💰</div>
              <h4 className="text-xl font-semibold mb-2">Smart Budgeting</h4>
              <p className="text-gray-600">
                Set monthly budgets, monitor progress, and get alerts to stay on
                track.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 text-4xl mb-4">📱</div>
              <h4 className="text-xl font-semibold mb-2">Cross-Platform Access</h4>
              <p className="text-gray-600">
                Use it on your phone, tablet, or desktop — your data stays in sync
                everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-indigo-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="text-indigo-600 text-4xl mb-4">📝</div>
              <h4 className="text-xl font-semibold mb-2">1. Sign Up</h4>
              <p className="text-gray-700">
                Create your free account in seconds. No credit card required.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 text-4xl mb-4">🔗</div>
              <h4 className="text-xl font-semibold mb-2">2. Link Accounts</h4>
              <p className="text-gray-700">
                Securely link your bank accounts to automatically import
                transactions.
              </p>
            </div>
            <div>
              <div className="text-indigo-600 text-4xl mb-4">📈</div>
              <h4 className="text-xl font-semibold mb-2">3. Get Insights</h4>
              <p className="text-gray-700">
                Visualize your spending, get smart alerts, and grow your savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="italic mb-4">
                "PaisaManager changed how I manage money. I finally feel in control of
                my finances."
              </p>
              <h5 className="font-semibold text-indigo-600">— Sayak A.</h5>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="italic mb-4">
                "Super intuitive and clean UI. I check it every day to stay on
                track!"
              </p>
              <h5 className="font-semibold text-indigo-600">— Jit G.</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
    <section className="bg-indigo-600 text-white py-20 text-center">
  <div className="container mx-auto px-6">
    {/* Conditional Heading and Paragraph */}
    {token && user ? (
      <>
        <h3 className="text-3xl font-bold mb-4">You're All Set! Start Tracking Your Expenses</h3>
        <p className="mb-6">
          You've successfully logged in. Begin managing your budget and tracking your spending today.
        </p>
      </>
    ) : (
      <>
        <h3 className="text-3xl font-bold mb-4">Ready to Master Your Money?</h3>
        <p className="mb-6">
          Join thousands of users already taking control of their budgets.
        </p>
      </>
    )}

    {/* Conditional CTA Button */}
    <a
      href={token && user ? "/dashboard" : "/register"}
      className="bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
    >
      {token && user ? "Track Expenses" : "Create Free Account"}
    </a>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">© 2025 PaisaManager. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/login" className="hover:underline">
              Login
            </a>
            <a href="/register" className="hover:underline">
              Register
            </a>
            <a href="#features" className="hover:underline">
              Features
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
