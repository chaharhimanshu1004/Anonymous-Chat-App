import React, { useEffect } from 'react'
import { useState } from 'react';
import '../styling/Chat.css'
import Message from './Message';
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { selectChannelId, selectChannelName } from '../slices/appSlice'

export default function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId)
  const channelName = useSelector(selectChannelName)
  const [input,setInput] = useState('');
  const [messages,setMessages] = useState([]);

  useEffect(()=>{
    const fetchMessages = async()=>{
      if(channelId){
        try{
          const response = await axios.get(`http://localhost:6001/api/users/get/conversation/${channelId}`)
          console.log(response.data);
        }catch(err){
          console.log(err)
        }
      }
    }
    fetchMessages();
  })


  return (
    <div className='chat1'>
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        <Message />
        <Message />
        <Message />

      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize='large' />
        <form>
          <input value={input}  type="text" placeholder={`Message #Youtube`}  onChange={(e)=>setInput(e.target.value)} />
          <button className='chat__inputButton' type='submit'>Send Message</button>


        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize='large' />
          <GifIcon fontSize='large' />
          <EmojiEmotionsIcon fontSize='large' />



        </div>

      </div>
    </div>

  )
}
