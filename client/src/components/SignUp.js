import React from "react";
import axios from "axios"
import { useState } from "react";
import * as Components from './sign-log';
import '../styling/signup.css'
import {useDispatch} from 'react-redux'
import {login} from '../slices/userSlice'
import { useEffect } from "react";

const getUserFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};

function App() {
    const [signIn, toggle] = React.useState(true);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
          dispatch(login(storedUser));
        }
    }, [dispatch]);

    const handleSignIn = async(event)=>{
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:6001/api/users/login',{
                username,
                password
            });
            if(response.data.token){
                dispatch(login({
                    name:username,
                    uid:response.data.userId
                }))
            }
            const {  userId } = response.data;
            localStorage.setItem('user', JSON.stringify({ username, userId }));
            
            
        }catch (error) {
            console.error('Error during login:', error);
        }
    }
    const handleSignUp = async(event)=>{
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:6001/api/users/register',{
                name,
                email
            });
            console.log(response);
        }catch (error) {
            console.error('Error during registration:', error);
        }
        
    }
    return(
        <div className="signupBody">
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title style={{fontSize:'1.5rem',lineHeight:'2rem'}}>Create Account</Components.Title>
                     <Components.Input type='text' value={name} onChange={(e)=>setName(e.target.value)} style={{marginTop:'.5rem'}} placeholder='Name' />
                     <Components.Input  type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Bennett Email' />
                     {/* <Components.Input type='password' placeholder='Confirm Bennett Email' /> */}
                     <Components.Button onClick={handleSignUp} style={{marginTop:'.5rem'}}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title style={{fontSize:'1.5rem',lineHeight:'2rem'}}>Sign in</Components.Title>
                      <Components.Input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
                      <Components.Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
                      {/* <Components.Anchor className="text-lg" href='#'>Forgot your password?</Components.Anchor> */}
                      <Components.Button onClick={handleSignIn}  style={{marginTop:'.5rem'}}>Log In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title style={{fontSize:'1.5rem',lineHeight:'2rem'}}>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title style={{fontSize:'1.5rem',lineHeight:'2rem'}}>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
        </div>
    )
}

export default App;