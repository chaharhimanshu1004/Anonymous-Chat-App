import React from 'react'
import '../styling/ChatHeader.css'

function ChatHeader({channelName}) {
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
            <h2>Bennett University Reviews</h2>

        </div>
    </div>
  )
}

export default ChatHeader