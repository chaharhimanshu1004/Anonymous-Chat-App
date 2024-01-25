
import './App.css';
import {  useSelector } from 'react-redux'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser } from './slices/userSlice'
import Login from './components/Login';
import { login } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if user information is stored in local storage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Parse the stored user information and dispatch the login action
      const parsedUser = JSON.parse(storedUser);
      dispatch(login({ name: parsedUser.username, uid: parsedUser.userId }));
    }
  }, [dispatch]);


  return (
    <div  className='app'>
      {
        user?(
          <>
          <Sidebar/>
          <Chat/>
          </>
        ):(
          <h2><Login/></h2>
        )
      }
      

    </div>
  );
}

export default App;
