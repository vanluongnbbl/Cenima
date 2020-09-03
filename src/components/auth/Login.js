import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../actions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        return setEmail(event.target.value);
      case "password":
        return setPassword(event.target.value);
      default:
        return 0;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authActions.userLogin({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>

      <label>Email</label>
      <input
        name='email'
        placeholder='Email'
        value={email}
        onChange={handleChange}
      />
      <br />

      <label>Password</label>
      <input
        type='password'
        name='password'
        placeholder='Password'
        value={password}
        onChange={handleChange}
      />
      <br />

      <input type='submit' value="Login" />
    </form>
  );
};

export default Login;
