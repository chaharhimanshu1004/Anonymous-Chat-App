
import './App.css';
import SignUp from './components/SignUp'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

function App() {
  return (
    
    <div  className='app'>
      {/* <SignUp></SignUp> */}
      
      <Sidebar/>
      <Chat/>
      

    </div>
  );
}

export default App;
