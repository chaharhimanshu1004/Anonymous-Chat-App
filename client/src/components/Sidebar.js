import React, { useEffect } from 'react'
import '../styling/Sidebar.css'
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice'
import Pusher from 'pusher-js'

const pusher = new Pusher('a67ee38d224d6d46bad7', {
  cluster: 'ap2'
});




export default function Sidebar() {
  const user = useSelector(selectUser);
  const [channels,setChannels] = useState([]);
  

  useEffect(()=>{
    const getChannels = async()=>{
      try{
        const response = await axios.get('http://localhost:6001/api/users/get/channelList');
        setChannels(response.data);
      }catch(err){
        console.log('Error in getting channels: ',err);
      }
    }
    getChannels();
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
    
  },[])
  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <h3>Anonymous Chat App</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon className='sidebar__addChanel' />
        </div>

        <div className="sidebar__channelList">
          {
            channels.map((channel)=>(
              (<SidebarChannel key={channel._id} channel={channel}/>)
            ))
          }
          


        </div>
      </div>
      <div className="sidebar__profile">
        {/* <Avatar src='https://media.cybernews.com/images/featured-big/2023/09/anonymous-hacker-mask.png'/> */}
        <Avatar src='https://m.economictimes.com/thumb/msid-76173969,width-1200,height-900,resizemode-4,imgsize-1099506/twitterati-began-following-longstanding-anonymous-posters-and-retweeting-them-.jpg'/>
        <div className="sidebar__profileInfo">
          <h3>Anonymous1</h3>
          <p>#Hacker</p>
        </div>
        <div className="sidebar__profileIcons">
          <SettingsIcon/>

        </div>


      </div>

    </div>
  )
}
