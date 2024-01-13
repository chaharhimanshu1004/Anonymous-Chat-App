
import './App.css';
import SignUp from './components/SignUp'
import {  useSelector } from 'react-redux'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser } from './slices/userSlice'
import Login from './components/Login';




function App() {
  const user = useSelector(selectUser);
  localStorage.removeItem('user')

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
      {/* <Sidebar/>
      <Chat/> */}
      <Login></Login> 
     
      {/* <SignUp></SignUp> */}

    </div>
  );
}

export default App;
