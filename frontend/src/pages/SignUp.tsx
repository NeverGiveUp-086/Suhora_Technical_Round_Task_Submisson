import React, { useState } from 'react'
import { registerUser } from '../redux/api/userApi';
import { RootState, useAppDispatch } from "../app/store";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [registerUserData, setLoginUserData] = useState({name: '', email: '', password: ''});

  const loginUserFunc = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(registerUserData);

    const res = await dispatch(registerUser(registerUserData));
    console.log(res);
    alert('Login Success');
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={loginUserFunc}>
        <input onChange={
          (e) => setLoginUserData({...registerUserData, name: e.target.value})
        } type="text" placeholder="Name" />
        <input onChange={
          (e) => setLoginUserData({...registerUserData, email: e.target.value})
        } type="text" placeholder="Email" />
        <input onChange={
          (e) => setLoginUserData({...registerUserData, password: e.target.value})
        } type="password" placeholder="Password" />
        <button>SignUp</button>
      </form>

      <a href="/login">Login</a>

      <style>{`
        .login {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        input {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px;
        }

        button {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px;
        }

        a {
          margin-top: 10px;
        }
      `}</style>
    </div>
  )
}

export default SignUp