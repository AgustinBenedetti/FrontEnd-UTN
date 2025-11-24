import React from 'react';
import ChannelSidebar from '../../Components/ChannelSidebar/ChannelSidebar';
import ChannelDetail from '../../Components/ChannelDetail/ChannelDetail';
import './WorkspaceScreen.css'

const WorkspaceScreen = () => {
  return (
    <div>
      <div className='component-channel-sidebar'>
        <ChannelSidebar/>
      </div>
      <div className='component-channel-detail'>
        <ChannelDetail/>
      </div>
    </div>
  )
}

export default WorkspaceScreen