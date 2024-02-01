import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import "./Modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "55%",
  transform: "translate(-50%, -70%)",
  width: 500,
  height: 460,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  border: "none",
  p: 4,
};

export default function BasicModal({ open, onApply, onClose }) {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobilenumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // Client-side validation
    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      alert("Please fill the required fields");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmpassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    // Continue with the form submission logic
    fetch("https://de-track-be.vercel.app/resource", {
      method: "POST",
      headers: {},
      body: JSON.stringify({
        username: `${firstname}${lastname}`,
        firstName: firstname,
        lastName: lastname,
        email: email,
        mobileNumber: mobilenumber,
        password: password,
      }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };


  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-describedby="modal-modal-description"
      >
        <div className="btn-container">
          <Box sx={style}>
            <div className="header-modal">
              <span>Create New Dimitra User</span>
              <span>
                <ClearIcon onClick={onClose} />
              </span>
            </div>

            <div className="box-modal-col-1">
              <label className="label-text" for="fname">
                First Name
                <input
                  className="input-field"
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required
                />
              </label>
              <label className="label-text" for="lastname">
                Last Name
                <input
                  className="input-field"
                  type="text"
                  name="lasname"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="box-modal-col-1">
              <label className="label-text" for="email">
                Email
                <input
                  className="input-field"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </label>
              <label className="label-text" for="mob-num">
                Mobile Number
                <input
                  className="input-field"
                  type="text"
                  name="password"
                  placeholder="Mobile Number"
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                  }}
                  required
                />
              </label>
            </div>

            <div className="box-modal-col-1">
              <label className="label-text" for="Password">
                Password
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </label>
              <label className="label-text" for="Password">
                Confirm Password
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
              </label>
            </div>
            <div className="btn-container">
              <Button
                className="btn-cancel"
                size="small"
                variant="contained"
                color="success"
                onClick={onClose}
              >
                cancel
              </Button>
              <Button
                className="btn-modal"
                size="small"
                variant="contained"
                color="success"
                onClick={(handleSubmit) => {
                  fetch("https://de-track-be.vercel.app/resource", {
                    method: "POST",
                    headers: {},
                    body: JSON.stringify({
                      username: `${firstname}${lastname}`,
                      firstName: firstname,
                      lastName: lastname,
                      email: email,
                      mobileNumber: mobilenumber,
                      password: password,
                    }),
                  })
                    .then((response) => {
                      console.log(response.status);
                      return response.json();
                    })
                    .then((data) => console.log(data))
                    .catch((error) => console.error("Error:", error));
                }}
              >
                Submit
              </Button>
            </div>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
