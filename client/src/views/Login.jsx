import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LogoSVG from "../assets/svg/Logo";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/vukkop/mern-project">
        RBIV
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(null);
  const [bgImageIdx, setBgImageIdx] = useState(0);
  const [imgArr, setImgArr] = useState([]);

  //! line 51 to line 113, line 119,126  written by !!!![[[[[PHTEVE N]]]]]!!!!
  //! co-authors (Immanuel, Braxton)
  // get a random number from 0-however many imgs are in array
  const getRandIdx = () => {
    return Math.floor(Math.random() * imgArr.length);
  };

  useEffect(() => {
    //declaring the interval
    const interval = setInterval(() => {
      //once this times out do it again
      // new Idx for image (which is a random #)
      let newIdx = getRandIdx();
      // if thant new num == img we're already on, get a new num till its not the same
      while (newIdx === bgImageIdx) {
        newIdx = getRandIdx();
      }
      //set the new num
      setBgImageIdx(newIdx);

      setTimeout(() => {
        setBgImageIdx(newIdx);
      }, 750);
    }, 5000);
    // clear interval so that we start a new interval and changes the background image
    return () => clearInterval(interval);
  }, [bgImageIdx, imgArr]);

  useEffect(() => {
    // Define an asynchronous function to fetch images from the Pexels API
    const getImage = async (image = "house", numImage = 15) => {
      // Construct the API URL with the provided image query and per_page parameter.
      const url = `https://api.pexels.com/v1/search?query=${image}&per_page=${numImage}`;
      // Make an HTTP GET request to the Pexels API.
      const response = await fetch(url, {
        method: "GET",
        headers: {
          // Set the Authorization header with the Pexels API key from environment variables.
          Authorization: process.env.REACT_APP_PEXELS_API_KEY,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Update the component's state with the array of fetched photos
      setImgArr(data.photos);
      // console.log(data.photos)
    };
    // Call the getImage function immediately when the component mounts.
    getImage();
    // The empty dependency array [] ensures this effect runs only on component mount and unmount.
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null); // to clear Previous errors
    setEmailError(false);
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/admin");
        console.log(userCredential);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {imgArr.length > 0 ? (
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${imgArr[bgImageIdx].src.original})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1.25s ease-in-out",
          }}
        />
      ) : (
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2980955/pexels-photo-2980955.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoSVG width={75} height={75} sx={{ m: 1 }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? "Invalid email address" : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between align-items-center">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              {error && (
                <Typography variant="h6" color="error" align="start">
                  {error && error.replace("Firebase:", "").trim()}
                </Typography>
              )}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Login;
