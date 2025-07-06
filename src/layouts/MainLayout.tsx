import React from 'react';

interface MainLayoutProps {
  children?: React.ReactNode;
  // Add any other props you might need
}

const MainLayout = ({children}:MainLayoutProps) => {
  return (
    <div>
      MainLayout component works!
    </div>
  );
};

export default MainLayout;