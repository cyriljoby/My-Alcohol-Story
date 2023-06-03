import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSidebar } from '../../components'
import { io } from "socket.io-client";
import {useEffect, useRef} from "react";
import {useAppContext} from "../../context/appContext";

const SharedLayout = () => {
  const { createWebsocket } = useAppContext();

  // Establish global socket since user should be authenticated on this layout
  useEffect(() => {
    createWebsocket();
  }, []);

  // In the future, show notifications, and new messages on the navbar, sidebar, etc

  return (
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
