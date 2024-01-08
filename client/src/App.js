
import './App.css';
import SignUp from './components/SignUp'
import { useSelector } from 'react-redux'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { selectUser } from './slices/userSlice'

function App() {
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
