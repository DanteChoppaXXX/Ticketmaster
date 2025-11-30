import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { signInWithEmailAndPassword, signOut } from "firebase/auth"; // ✅ import signOut
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

// 🔥 Create/get a permanent device ID
const getDeviceId = () => {
  let id = localStorage.getItem("deviceId");
  if (!id) {
    id = uuid();
    localStorage.setItem("deviceId", id);
  }
  return id;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Ensure Firestore user profile exists
  const ensureUserDocument = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        username: user.email.split("@")[0],
        createdAt: new Date(),
      });
    }
  };

  // 🔥 Strict one-device login
  const validateDeviceLock = async (uid) => {
    const deviceId = getDeviceId();
    const sessionRef = doc(db, "sessions", uid);
    const snap = await getDoc(sessionRef);

    if (snap.exists()) {
      const data = snap.data();

      if (!data.registeredDeviceId || data.registeredDeviceId !== deviceId) {
        throw new Error("Contact Admin to get account for this device.");
      }

      return; // device matches
    }

    // First login → lock this device
    await setDoc(sessionRef, {
      registeredDeviceId: deviceId,
      createdAt: Date.now(),
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await ensureUserDocument(user);

      // 🔥 validate device BEFORE redirect
      await validateDeviceLock(user.uid);

      setLoading(false);
      // redirect handled by your router
    } catch (err) {
      console.error(err);

      // 🔥 Force logout if validation failed
      try {
        await signOut(auth);
      } catch (signOutErr) {
        console.error("Error signing out:", signOutErr);
      }

      if (err.message.includes("Contact Admin")) {
        setError("Contact Admin to get account for this device.");
      } else {
        setError("Invalid email or password.");
      }

      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="700"
          color="#000"
          textAlign="left"
          sx={{ mb: 3 }}
        >
          Sign In
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email address"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "4px",
              },
            }}
          />

          {error && (
            <Typography color="error" mt={1} mb={1} fontSize={14}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.3,
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              backgroundColor: "#0070f3",
              "&:hover": { backgroundColor: "#005ad1" },
            }}
          >
            Sign In
          </Button>

          <Typography
            variant="body2"
            color="#0070f3"
            textAlign="center"
            sx={{ mt: 2, cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
        </form>

        <Typography
          variant="body2"
          color="#ff0000"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          Don’t have an account or getting kicked out? Contact Admin to get your own account
        </Typography>
      </Paper>
    </Box>
  );
}

