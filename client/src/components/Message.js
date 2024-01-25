import React from 'react'
import '../styling/Message.css'
import { Avatar } from '@mui/material';


function Message({message,user,timestamp}) {
  console.log(user);

  return (
    <div className='message'>
        <Avatar src='https://media.cybernews.com/images/featured/2023/09/anonymous-hacker-mask.png'/>
        <div className="message__info">
            <h4>{user.name}
                <span className="message__timestamp">
                    {new Date(parseInt(timestamp)).toDateString()}
                </span>
            </h4>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default Message