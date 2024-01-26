import React from 'react'
import '../styling/Message.css'
import { Avatar } from '@mui/material';


function Message({message,user,timestamp}) {




  return (
    <div className='message'>
        <Avatar src={user.photo?user.photo : 'https://media.cybernews.com/images/featured/2023/09/anonymous-hacker-mask.png'}/>
        <div className="message__info">
            <h4>{user.name}
                <span className="message__timestamp">
                    {new Date(parseInt(timestamp)).toDateString()}
                </span>
            </h4>
            <p style={{fontWeight:'500',marginTop:'2px'}}>{message}</p>
        </div>
    </div>
  )
}

export default Message