import TextField from "@mui/material/TextField";

import axios from "axios";
import Cookies from "js-cookie";

import { useContext, useState } from "react";
import { DataContext } from "../../context/login.context";
import { Link } from "react-router-dom";

const Login = () => {
  //   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });
  const [response, setResponse] = useState({ type: "", message: "" });

  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   const token = Cookies.get("token");

  const { setIsLoggedIn } = useContext(DataContext);
  //   console.log(isLoggedIn);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/user/login", values, {
        headers: { "Content-Type": "application/json" },
      });

      setResponse({ message: "successfully signed in", type: "success" });

      setIsLoading(false);

      const user = {
        id:response.data.data.user._id,
        bio: response.data.data.user.bio,
        email: response.data.data.user.email,
        favorite_books: response.data.data.user.favorite_books,
        firstName: response.data.data.user.firstName,
        followers: response.data.data.user.followers,
        following_authors: response.data.data.user.following_authors,
        following_readers: response.data.data.user.following_readers,
        lastName: response.data.data.user.lastName,
        picture_url: response.data.data.user.picture_url,
      };

      Cookies.set("user", response.data.token);
      setIsLoggedIn(true);

      localStorage.setItem("userData", JSON.stringify({ user }));
      window.location.href = "/";
    } catch (error) {
      setResponse({ message: error?.response?.data?.message, type: "error" });

      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-form">
      <div className="admin-login-float-project">
        <h2>
          <br></br> <span> Reviewer Login </span>
        </h2>
        <div className="add-admin-input">
          {!isLoading && response.message && (
            <p className={response.type}>{response.message}</p>
          )}
          {isLoading && <p className="message">...loading</p>}
          <TextField
            name="email_or_phone"
            required
            id="outlined-required-2"
            label="Email or Phone"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          <TextField
            name="password"
            type="password"
            required
            id="outlined-required"
            label="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <button
            disabled={isLoading}
            className="admin-project-submit"
            value={!isLoading ? "Login" : "Verifying..."}
            onClick={fetchData}
          >
            Login
          </button>
          <Link className="center" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
