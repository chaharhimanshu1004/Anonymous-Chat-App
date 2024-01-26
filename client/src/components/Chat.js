import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { useState } from 'react';
import '../styling/Chat.css'
import Message from './Message';
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { selectChannelId, selectChannelName } from '../slices/appSlice'
import SendIcon from '@mui/icons-material/Send';
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import Pusher from 'pusher-js'




const pusher = new Pusher('a67ee38d224d6d46bad7', {
  cluster: 'ap2'
});


export default function Chat() {

  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId)
  const channelName = useSelector(selectChannelName)
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatMessagesRef = useRef(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);




  
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) {
      alert('Select a Channel First')
      return;
    }
    if (input.trim() === '') {
      // alert(`Can't send Empty Messages`)
      return;
    }
    try {
      // Make a POST request to your backend API to send the message
      await axios.post(`http://localhost:6001/api/users/addMessage?id=${channelId}`, {
        message: input,
        timestamp: Date.now(),
        user: {
          name: user.name,   
          photo: user.imageUrl, 
          uid: user.userID,    
        },

      });
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (channelId) {
        try {
          const response = await axios.get(`http://localhost:6001/api/users/get/conversation?id=${channelId}`)
          setMessages(response.data);
        } catch (err) {
          console.log(err)
        }
      }
    }
    fetchMessages();
    const channel = pusher.subscribe('conversation');
    channel.bind('newMessage', function (data) {
      fetchMessages();
    });
  }, [channelId])

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);


  if (!channelId) {
    return (
      <div className="chat1">
        <ChatHeader channelName={channelName} />
        <div className="chat__selectChannelMessage">
          <p>Select the channel to start the conversation</p>
        </div>


      </div>
    )
  }


  return (



    <div className='chat1'>

      <ChatHeader channelName={channelName} />
      <div className="chat__messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <Message key={index} message={message.message} timestamp={message.timestamp} user={message.user} />

      ))}


      </div>
      <div className={`emojiPickerContainer ${isPickerVisible ? 'd-block' : 'd-hidden'}`}>
        <Picker data={data} previewPosition='none'
        onEmojiSelect={(e)=>{
          setInput((...prev)=>prev+e.native)
        }}
         />
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize='large' />
        <form>
          <input value={input} type="text" placeholder={channelName ? `Message #${channelName}` : 'Message '} onChange={(e) => setInput(e.target.value)} />
          <div className="chat__inputIcons">
            <EmojiEmotionsIcon fontSize='large'   onClick={() => setIsPickerVisible(!isPickerVisible)} />

          </div>
          <button onClick={sendMessage} className='chat__inputButton' type='submit'><SendIcon style={{ color: 'rgb(212,211,211)' }} fontSize='large' /></button>
        </form>


      </div>
    </div>

  )
}
