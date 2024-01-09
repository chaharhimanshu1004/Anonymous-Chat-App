import React from 'react'
import '../styling/SidebarChannel.css' 
import { useDispatch } from 'react-redux'
import {setChannelInfo} from '../slices/appSlice'


export default function SidebarChannel({channel}) {
  const dispatch = useDispatch();
  const id = channel._id;
  const channelName = channel.channelName;

  return (
    <div className='sidebarChannel' onClick={()=>dispatch(setChannelInfo({
      channelId:id,
      channelName:channelName
    }))}>
        <h4>
            <span className='sidebarChannel__hash'>#</span>
            {channelName}
        </h4>
    </div>
  )
}
