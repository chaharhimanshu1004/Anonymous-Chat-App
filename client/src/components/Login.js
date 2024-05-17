import React, { useEffect, useState } from 'react';
import '../styling/Login.css'
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {login} from '../slices/userSlice'
import toast from 'react-hot-toast';


const App = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch();

  const handleSignUp = async(event)=>{
    event.preventDefault();
    try{
        await axios.post('http://localhost:6001/api/users/register',{
            name,
            email
        })
        .then((response)=>{
            if(response.data.message){
                toast.success('User Registered Successfully,Check your Email for Login Details');
            }
        })
        
    }catch (error) {
        console.error('Error during registration:', error);
        toast.error('Error during registration!');
    }
  }
  const handleAxiosError = (error) => {
    console.error('Axios error:', error);


    if (error.response && error.response.status === 400) {
      alert('Either User is already Registered or check Your EMail,Only Bennett Students can sign in and register');
    }
  };

  const handleSignIn = async(event)=>{
    event.preventDefault();
    try{
        const response = await axios.post('http://localhost:6001/api/users/login',{
            username,
            password
        });
        // console.log(response);
        if(!response.data.token){
          alert('Check your credentials!')
        }

        if(response.data.token){
            dispatch(login({
                name:username,
                userID:response.data.userID,
                imageUrl:response.data.imageUrl,
            }))
        }
        const userID  = response.data.userID;
        const imageUrl = response.data.imageUrl;
        localStorage.setItem('user', JSON.stringify({ username, userID, imageUrl }));
        toast.success('Logged in successfully!');
        
    }catch (error) {
        console.error('Error during login:', error);
    }
}

  const [isContainerActive, setIsContainerActive] = useState(false);
  useEffect(() => {
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    const handleRegisterClick = () => {
      setIsContainerActive(true);
    };

    const handleLoginClick = () => {
      setIsContainerActive(false);
    };

    registerBtn.addEventListener('click', handleRegisterClick);
    loginBtn.addEventListener('click', handleLoginClick);

    return () => {
      registerBtn.removeEventListener('click', handleRegisterClick);
      loginBtn.removeEventListener('click', handleLoginClick);
    };
  }, []);


  return (
    <div className="fullContainer">
      <div className={`container ${isContainerActive ? 'active' : ''}`} id="container">
      <div className="form-container sign-up">
        <form>
          <h1 style={{fontWeight:'bold',fontSize:'36px'}}>Create Account</h1>
          <input  value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" />
          <input  type="email" placeholder="Email" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Confirm Email" />
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1 style={{fontWeight:'bold',fontSize:'40px'}}>Sign In</h1>
          
          <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Username" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
          <button onClick={handleSignIn}>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Bennetians!</h1>
            <p style={{fontSize:'15px',fontWeight:'500'}}>Register with your personal details to use all site features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default App;
