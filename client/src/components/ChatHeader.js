import React from 'react'
import '../styling/ChatHeader.css'


function ChatHeader({channelName}) {

    const handleLogout = (e)=>{
        e.preventDefault();
        const isConfirmed = window.confirm('Are you sure you want to log out?');

        if (isConfirmed) {
            localStorage.removeItem('user');
            window.location.reload();
        }
    }

  return (
    <div className='chatHeader'>
        <div className="chatHeader__left">
            <h3>
                <span className='chatHeader__hash'>
                    # 
                </span>
                {/* {channelName?(channelName):'Hello'} */}
                {channelName}
            </h3>

        </div>
        <div className="chatHeader__right">
            <h2>Bennett University </h2>
            <button className='logout__button' onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default ChatHeader