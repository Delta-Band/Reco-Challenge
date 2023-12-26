/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { row } from '../sharedStyles';
import { motion } from 'framer-motion';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';

export default function AppList() {
  const [appList, setAppList] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);

  async function getAppList() {
    const response = await fetch('/api/v1/app-service/get-apps', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
      body: JSON.stringify({
        pageNumber: 0,
        pageSize: 25
      })
    });
    const data = await response.json();
    if (data.appRows) {
      setAppList(data.appRows.map(item => ({ ...item, id: item.appId })));
    }
  }

  useEffect(() => {
    getAppList();
  }, []);

  const columns = [
    {
      field: 'appName',
      headerName: 'Name',
      width: 200,
      renderCell: params => {
        return (
          <div css={[row.standard, css({ padding: 8 })]}>
            <div
              css={theme => ({
                width: 40,
                height: 40,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 40
              })}
            />
            <Typography>{params.value}</Typography>
          </div>
        );
      }
    },
    { field: 'category', headerName: 'Category', width: 400 },
    { field: 'appSources', headerName: 'Sources', width: 400 }
  ];

  function onRowClick({ row }) {
    setSelectedAppId(row.id);
  }

  return (
    <div css={{ overflowX: 'hidden' }}>
      <Typography
        variant='h4'
        css={theme => ({ marginBlockEnd: theme.space.lg })}
      >
        App Inventory
      </Typography>
      <DataGrid rows={appList} columns={columns} onRowClick={onRowClick} />
      <Drawer
        selectedAppId={selectedAppId}
        onClose={() => setSelectedAppId(null)}
      />
      {/* {appList.map((app, i) => (
        <AppListItem key={i} app={app} />
      ))} */}
    </div>
  );
}

function Drawer({ selectedAppId = null, onClose = () => {} }) {
  return (
    <motion.div
      css={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%',
        backgroundColor: '#FAFAFA'
      }}
      initial={{
        x: '100%'
      }}
      animate={{
        x: selectedAppId ? 0 : '100%'
      }}
      transition={{
        type: 'spring',
        damping: 20
      }}
    >
      <Button onClick={onClose}>
        <CloseIcon size={32} />
      </Button>
    </motion.div>
  );
}

Drawer.propTypes = {};
