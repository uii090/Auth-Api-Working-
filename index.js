const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =====================================================
// APPROVED USERS
// =====================================================
// These are the ONLY users who can log in.
//
// To add another approved user, add another object here.
// Users registered through the Android app are NOT added
// to this list.
//
// IMPORTANT: Replace the example passwords below.
// =====================================================

const users = [
  {
    LastName: "Guardiario",
    FirstName: "Gil",
    Email: "gil.guardiario090@gmail.com",
    Password: "tanawmanka"
  },
  {
    LastName: "Diko",
    FirstName: "Sure",
    Email: "diko_sure@ifsaktoni.com",
    Password: "wajudkayklaro"
  }
];

// =====================================================
// ROOT
// =====================================================

app.get("/", (req, res) => {
  res.send("API is running");
});

// =====================================================
// GET USERS
// =====================================================
// Used by your Android Users List page.
//
// Passwords are NOT returned to Android.
// =====================================================

app.get("/api/users", (req, res) => {
  const publicUsers = users.map(user => ({
    LastName: user.LastName,
    FirstName: user.FirstName,
    Email: user.Email
  }));

  res.json(publicUsers);
});

// =====================================================
// LOGIN
// =====================================================
// Android sends:
//
// {
//   "email": "example@email.com",
//   "password": "password"
// }
//
// The API checks those credentials against the users
// manually stored above.
// =====================================================

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  const user = users.find(
    user =>
      user.Email.toLowerCase() === email.toLowerCase() &&
      user.Password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    user: {
      FirstName: user.FirstName,
      LastName: user.LastName,
      Email: user.Email
    }
  });
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
