import React, { useEffect, useState } from 'react'
import { loginUser } from '../redux/api/userApi';
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginUserData, setLoginUserData] = useState({email: '', password: ''});
  const {user} = useSelector((state:RootState) => state.user);
  const route = useNavigate();

  const loginUserFunc = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(loginUserData);

    const res = await dispatch(loginUser(loginUserData));
    if(res){
      // document.cookie = `token=${res.payload.token}`;
      if(res.payload){
        console.log(res.payload.token);
        localStorage.setItem('user', JSON.stringify(res.payload.token));
      }
      else{
        alert('Invalid Email or Password');
      }
    }
    console.log(res);

    // alert('Login Success');
  }

  useEffect(() => {
    if(user){
      // alert('Login Success');
      route('/dashboard');
    }
  }, [user])

  return (
    <div className="login">
      <h1>Login</h1>

      <form onSubmit={loginUserFunc}>
        <input onChange={
          (e) => setLoginUserData({...loginUserData, email: e.target.value})
        } type="text" placeholder="Email" />
        <input onChange={
          (e) => setLoginUserData({...loginUserData, password: e.target.value})
        } type="password" placeholder="Password" />
        <button>Login</button>
      </form>

      <a href="/signup">Signup</a>

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

export default Login