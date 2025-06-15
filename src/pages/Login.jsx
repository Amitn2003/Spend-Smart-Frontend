
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       console.log(data, "data");
//       if (!res.ok) throw new Error(data.message);
//       if (res.ok) {
//         login(data.token, data.user); // ← your auth context method
//         navigate("/dashboard"); // ← redirect after login
//       }
//       // navigate("/dashboard");
//     } catch (err) {
//       setMsg(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 mt-10 space-y-3">
//       <h2 className="text-xl font-bold">Login</h2>
//       <input type="email" placeholder="Email" className="w-full p-2 border"
//         value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" className="w-full p-2 border"
//         value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//       <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
//       {msg && <p className="text-red-500">{msg}</p>}
//     </form>
//   );
// };

// export default Login;













import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import GoogleAuth from "../components/GoogleAuth"; // Uncomment if using Google Login

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Logging in...");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      login(data.token, data.user);
      toast.dismiss();
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      toast.error(err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9f9f9"
    }}>
      <Toaster />
      <Grid container spacing={4} alignItems="center" justifyContent="center">
  {/* Image Section */}
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      order: { xs: 1, md: 1 }, // Image first on all
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <img
      src="/login-cat.png"
      alt="Login Visual"
      style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
    />
  </Grid>

  {/* Login Form Section */}
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      order: { xs: 2, md: 2 }, // Form always second, just stacked differently on mobile
    }}
  >
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Welcome Back
      </Typography>
      <Typography variant="body2" mb={3} color="text.secondary">
        Login to your account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          required
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      {/* Divider */}
      <Box sx={{ mt: 3, display: "flex", alignItems: "center" }}>
        <hr style={{ flex: 1, borderColor: "#ccc" }} />
        <Typography sx={{ mx: 2, color: "#999" }}>OR</Typography>
        <hr style={{ flex: 1, borderColor: "#ccc" }} />
      </Box>

      {/* Google Auth Placeholder */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="primary" disabled>
          Google Login (Coming Soon)
        </Button>
      </Box>

      {/* Register Link */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?
        </Typography>
        <Button
          href="/register"
          variant="outlined"
          color="primary"
          sx={{ mt: 1 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  </Grid>
</Grid>

    </Container>
  );
};

export default Login;
