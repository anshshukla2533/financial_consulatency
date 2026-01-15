import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children?: React.ReactNode;
  userType?: 'client' | 'ca' | string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main>{children ?? <Outlet />}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;