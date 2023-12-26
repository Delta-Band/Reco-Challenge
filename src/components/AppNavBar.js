/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { css } from '@emotion/react';
import { row } from '../sharedStyles';
import { Tab, Tabs } from '@mui/material';
import { PropTypes } from 'prop-types';

export default function AppNavBar({ selectedTab, setSelectedTab }) {
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <div
      css={[
        row.standard,
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
      <div css={[row.standard]}>
        <Typography variant='h5'>Reco</Typography>
        <Tabs
          value={selectedTab}
          onChange={setSelectedTab}
          aria-label='main navigation tabs'
          indicatorColor='secondary'
          textColor='secondary'
        >
          <Tab label='Apps' {...a11yProps(0)} />
        </Tabs>
      </div>
      <div css={[row.standard]}>
        <Typography variant='h5'>User Here</Typography>
      </div>
    </div>
  );
}

AppNavBar.propTypes = {
  selectedTab: PropTypes.number.isRequired,
  setSelectedTab: PropTypes.func.isRequired
};
