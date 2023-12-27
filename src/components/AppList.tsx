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
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  });

  console.log('appList: ', appList);

  const getAppList = async (): Promise<void> => {
    setIsLoading(true);
    const response = await fetch('/api/v1/app-service/get-apps', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
      body: JSON.stringify({
        pageNumber: paginationModel.page,
        pageSize: paginationModel.pageSize
      })
    });
    if (response.ok) {
      const data = await response.json();
      setAppList(
        data.appRows.map((item: { appId: any }) => ({
          ...item,
          id: item.appId
        }))
      );
      setTotalCount(data.totalCount);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.error(`${response.statusText} [code: ${response.status}]`);
    }
  };

  useEffect(() => {
    getAppList();
  }, [paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    // document.body.style.overflow = selectedAppId ? 'hidden' : 'auto';
  }, [selectedAppId]);

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

  console.log('totalCount:', totalCount);

  return (
    <div css={{ overflowX: 'hidden', paddingInline: 48, paddingBlock: 36 }}>
      <Typography variant='h4' css={theme => ({ marginBlockEnd: 24 })}>
        App Inventory
      </Typography>
      <DataGrid
        loading={isLoading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode='server'
        rows={appList}
        rowCount={totalCount}
        columns={columns}
        onRowClick={onRowClick}
        rowHeight={76}
        disableRowSelectionOnClick
        pageSizeOptions={[25, 50]}
        css={{
          height: 'calc(100vh - 211px)',
          backgroundColor: '#FFFFFF',
          borderRadius: 8
        }}
      />
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
