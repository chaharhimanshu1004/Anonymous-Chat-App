
import './App.css';
import SignUp from './components/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser } from './slices/userSlice'
import {login,logout} from './slices/userSlice'
import { useEffect } from 'react';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(login({ name: "kanha buddy", uid: "21627463272742" }));
  }, [dispatch]);
  const user = useSelector(selectUser);


  
  

  return (
    
    <div  className='app'>
      {/* {
        user?(
          <>
          <Sidebar/>
          <Chat/>
          </>
        ):(
          <h2><SignUp/></h2>
        )
      } */}
      <Sidebar/>
      <Chat/>
      

    </div>
  );
}

export default App;
