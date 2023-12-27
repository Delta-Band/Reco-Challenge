/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { AppNavBar, AppList } from './components';

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        backgroundColor: '#FAFAFA',
        '& *': {
          boxSizing: 'border-box'
        }
      }}
    >
      <AppNavBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <AppList />
    </div>
  );
};

export default App;
