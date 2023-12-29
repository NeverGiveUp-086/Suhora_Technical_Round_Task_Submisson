import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/api/userApi';

const Navbar = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const {user} = useSelector((state:RootState) => state.user);
  // if(user && user.success){
    // console.log(user?.user);
    console.log(user);
    const [userData, setUserData] = React.useState({
      user: {
        name: '',
        email: ''
      }
    });
  // }

  useEffect(() => {
    if(user){
      setUserData(user);
    }
  }, [user]);

  const logouttheuser = () => {
    const res = dispatch(logoutUser());
    localStorage.removeItem('token');
    router('/login');
  }

  return (
    <div className="navbar">
      <div className="name">{userData?.user?.name}</div>
      <button title='logout' onClick={logouttheuser} className="logout">Logout</button>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #333;
          color: #ff9;
        }
        .logout {
          cursor: pointer;
          padding: 0.5rem;
          border: none;
          border-radius: 5px;
          background-color: #555;
          color: #fff;
        }


        .logout:hover {
          background-color: #777;
        }

        .name {
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default Navbar