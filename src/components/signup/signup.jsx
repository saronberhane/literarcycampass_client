import { Avatar } from "@mui/material";
import TextField from "@mui/material/TextField";

import axios from "axios";

import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  //   const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [bookImage, setBookImage] = useState({
    picture_url: "",
    picture_pub_id: "",
  });

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //   console.log(values);
  const [response, setResponse] = useState({ type: "", message: "" });

  //   const storedData = JSON.parse(localStorage.getItem("userData"));
  //   const token = Cookies.get("token");

  const signUpUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/user", {
        ...values,
        ...bookImage
      }, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse({ message: response?.data?.message, type: "success" });
      setIsLoading(false);
    } catch (error) {
      setResponse({ message: error?.response?.data?.message, type: "error" });
      setIsLoading(false);
    }
  };

  
  function handleImageChange(e) {
    setIsLoading(true);
    const file = e.target.files[0];

    // Check that the file size is less than or equal to 400 KB
    if (file && file.size <= 400 * 1024) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const img = new Image();
        img.src = event.target.result;

        const handleUpload = async () => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "e3jaubid"); // Replace with your upload preset

          fetch(`https://api.cloudinary.com/v1_1/forfeta/image/upload`, {
            method: "POST",
            body: formData,
          })
            .then((response) => response.json())
            .then((data) => {
              console.log({
                image_secure_url: data.secure_url,
                image_public_id: data.public_id,
              });
              setBookImage({
                picture_url: data.secure_url,
                picture_pub_id: data.public_id,
              });
              setIsLoading(false)

            })
            .catch(() => {
              alert("Error occurred while uploading");
              // throw error;
              setIsLoading(false);
            });
        };
        handleUpload();
      };

      reader.readAsDataURL(file);
    } else {
      // Display an error message or take other action as appropriate for exceeding file size limit
      //   setImageError("File exceeds allowed size limit of 400 KB.");
      alert("File exceeds allowed size limit of 400 KB.");
    }
  }

  return (
    <div className="admin-login-form2">
      <div className="admin-login-float-project">
        <h2>
          <br></br> <span> Reviewer SignUp Form </span>
        </h2>
        <div className="add-admin-input">
          {!isLoading && response.message && (
            <p className={response.type}>{response.message}</p>
          )}
          {isLoading && <p className="message">...loading</p>}

          <Avatar
          alt={"pic"}
          src={bookImage.picture_url}
          sx={{ width: 76, height: 76 }}
        />
        <div>
          <input
            required
            type="file"
            accept=".jpg,.png,.jpeg"
            onChange={handleImageChange}
            className="upload-img"
          />
        </div>

          <TextField
            required
            label="First Name"
            onChange={(e) =>
              setValues({ ...values, firstName: e.target.value })
            }
          />
          <TextField
            name="email_or_phone"
            required
            label="Last Name"
            onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          />
          <TextField
            name="email_or_phone"
            required
            label="Bio"
            onChange={(e) => setValues({ ...values, bio: e.target.value })}
          />
          <TextField
            name="email_or_phone"
            required
            label="Email"
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
          <TextField
            name="password"
            type="password"
            required
            id="outlined-required"
            label="Confirm Password"
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
          />
          <button
            disabled={isLoading}
            className="admin-project-submit"
            value={!isLoading ? "Login" : "Verifying..."}
            onClick={signUpUser}
          >
            Sign Up
          </button>
          <Link className="center" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
