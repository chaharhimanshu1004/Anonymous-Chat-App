import React from "react";
import axios from "axios"
import { useState } from "react";
import * as Components from './sign-log';


function App() {
    const [signIn, toggle] = React.useState(true);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSignIn = async(event)=>{
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:6001/api/users/login',{
                username,
                password
            });
            
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
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title className="text-2xl ">Create Account</Components.Title>
                     <Components.Input type='text' value={name} onChange={(e)=>setName(e.target.value)} className="mt-2" placeholder='Name' />
                     <Components.Input  type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Bennett Email' />
                     {/* <Components.Input type='password' placeholder='Confirm Bennett Email' /> */}
                     <Components.Button onClick={handleSignUp} className="mt-2">Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title className="text-2xl">Sign in</Components.Title>
                      <Components.Input type='text' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
                      <Components.Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
                      {/* <Components.Anchor className="text-lg" href='#'>Forgot your password?</Components.Anchor> */}
                      <Components.Button onClick={handleSignIn}  className="mt-2">Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title className="text-2xl">Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title className="text-2xl">Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
    )
}

export default App;