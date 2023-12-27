/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import sharedStyles from '../sharedStyles';
import { motion } from 'framer-motion';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';
import AppDrawer from './AppDrawer';
import AppCard from './AppCard';
import { AppItem } from '../models';

const AppList: React.FC = () => {
  const [appList, setAppList] = useState<AppItem[]>([]);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const getAppList: () => Promise<void> = async () => {
    try {
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
        setAppList(
          data.appRows.map((item: { appId: any }) => ({
            ...item,
            id: item.appId
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAppList();
  }, []);

  const columns = [
    {
      field: 'appName',
      headerName: 'Name',
      width: 200,
      renderCell: (params: any) => {
        return <AppCard name={params.value} />;
      }
    },
    { field: 'category', headerName: 'Category', width: 400 },
    { field: 'appSources', headerName: 'Sources', width: 400 }
  ];

  const onRowClick = (row: {
    row: { id: React.SetStateAction<string | null> };
  }) => {
    setSelectedAppId(row.row.id);
  };

  return (
    <div
      css={{ overflowX: 'hidden', paddingInline: 48, paddingBlockStart: 36 }}
    >
      <Typography variant='h4' css={theme => ({ marginBlockEnd: 24 })}>
        App Inventory
      </Typography>
      <DataGrid rows={appList} columns={columns} onRowClick={onRowClick} />
      <motion.div
        style={{ pointerEvents: selectedAppId ? 'all' : 'none' }}
        onClick={e => {
          e.stopPropagation();
          setSelectedAppId(null);
        }}
        css={{
          background: 'rgba(0, 0, 0, 0.5)',
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0
        }}
        animate={{
          opacity: selectedAppId ? 1 : 0
        }}
      />
      <AppDrawer
        selectedAppId={selectedAppId}
        onClose={() => setSelectedAppId(null)}
        appOverview={
          selectedAppId
            ? appList.find(app => app.id === selectedAppId)
            : undefined
        }
      />
      {/* {appList.map((app, i) => (
          <AppListItem key={i} app={app} />
        ))} */}
    </div>
  );
};

export default AppList;
