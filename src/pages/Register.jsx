// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Register = () => {
//   const [form, setForm] = useState({ username: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   useEffect(() => {
//     // Check if user is already logged in
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard"); // Redirect to dashboard if already logged in
//     }
//   }, [navigate, login]);

//   // const navigate = useNavigate();
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       console.log(form, "form")
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       console.log(data, "data")
//       if (!res.ok) throw new Error(data.message);
//       if(res.ok && res  .status === 201) {
//         console.log("Registration successful");
//         // console.log("Response data:", data);
//         login(data.token, data.user); // Assuming your auth context has a login method
//         console.log("User logged in:", data.user);
//         useNavigate("/dashboard"); // Redirect to dashboard after successful registration
//         // window.location.reload(); // Reload the page to update user state
//         setForm({ username: "", email: "", password: "" }); // Reset form
//         setMsg("Registration successful! Now login.");
//       }
//       // setMsg("Registered! Now login.");
//       // setTimeout(() => navigate("/"), 1000);
//     } catch (err) {
//       setMsg(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister} className="max-w-md mx-auto p-4 mt-10 space-y-3">
//       <h2 className="text-xl font-bold">Register</h2>
//       <input type="text" placeholder="Username" className="w-full p-2 border"
//         value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
//       <input type="email" placeholder="Email" className="w-full p-2 border"
//         value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//       <input type="password" placeholder="Password" className="w-full p-2 border"
//         value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
//       {msg && <p className="text-red-500">{msg}</p>}
//     </form>
//   );
// };

// export default Register;












import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    occupation: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (res.ok && res.status === 201) {
        toast.success("Registration successful!");
        login(data.token, data.user);
        navigate("/dashboard");
      }
    } catch (err) {
      setMsg(err.message || "Something went wrong. Try again.");
      toast.error(err.message || "Something went wrong. Try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{flexGrow: 1}}>
        {/* Image (Left on Desktop, Top on Mobile) */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <img
            src="/register-cat.png"
            alt="Register"
            style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
          />
        </Grid>

        {/* Form */}
        <Grid item xs={12} md={6} sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              width: "100%",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Register
            </Typography>
            <Typography variant="body2" mb={3} color="text.secondary">
              Create your account
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                fullWidth
                name="username"
                value={form.username}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                label="Address (Optional)"
                fullWidth
                name="address"
                value={form.address}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Occupation (Optional)"
                fullWidth
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Phone Number"
                fullWidth
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                label="Password"
                fullWidth
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                sx={{ mt: 1 }}
                control={<Checkbox required />}
                label={
                  <Typography variant="body2">
                    I agree to the{" "}
                    <Link to="/privacy" style={{ color: "#1976d2" }}>
                      terms and conditions
                    </Link>
                    .
                  </Typography>
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Register
              </Button>
              {msg && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {msg}
                </Typography>
              )}
            </form>

            {/* Already have an account */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?
              </Typography>
              <Button
                href="/login"
                variant="outlined"
                color="primary"
                sx={{ mt: 1 }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
