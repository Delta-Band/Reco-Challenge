/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { AppNavBar } from '../components';
import { Outlet } from 'react-router-dom';

export default function Root() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div
      css={{
        overflowX: 'hidden',
        '& *': {
          boxSizing: 'border-box'
        }
      }}
    >
      <AppNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div
        css={{
          paddingInline: 80,
          paddingBlock: 60,
          width: '100%'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
