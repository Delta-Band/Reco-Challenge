/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import sharedStyles from '../sharedStyles';
import { Tab, Tabs } from '@mui/material';

interface AppNavBarProps {
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const AppNavBar: React.FC<AppNavBarProps> = ({
  selectedTab,
  setSelectedTab
}) => {
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <div
      css={[
        sharedStyles.row.standard,
        css({
          width: '100vw',
          backgroundColor: '#1F5CED',
          color: '#FFFFFF',
          justifyContent: 'space-between',
          paddingInline: 24,
          paddingBlock: 12
        })
      ]}
    >
      <div css={[sharedStyles.row.standard]}>
        <Typography variant='h5'>Reco</Typography>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label='main navigation tabs'
          indicatorColor='secondary'
          textColor='secondary'
        >
          <Tab label='Apps' {...a11yProps(0)} />
        </Tabs>
      </div>
      <div css={[sharedStyles.row.standard]}>
        <Typography variant='h5'>User Here</Typography>
      </div>
    </div>
  );
};

export default AppNavBar;
