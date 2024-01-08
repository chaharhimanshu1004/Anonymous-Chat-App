import React from 'react'
import '../styling/Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
export default function Sidebar() {
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
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
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