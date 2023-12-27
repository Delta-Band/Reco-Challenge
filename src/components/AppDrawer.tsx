/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';
import { AppItem } from '../models';
import AppCard from './AppCard';
import sharedStyles from '../sharedStyles';
import AppInfo from './AppInfo';
import UserList from './UserList';

interface DrawerProps {
  selectedAppId: string | null;
  onClose: () => void;
  appOverview?: AppItem;
}

const Drawer: React.FC<DrawerProps> = ({
  selectedAppId = null,
  onClose = () => {},
  appOverview
}) => {
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const getAppOverview: () => Promise<void> = async () => {
    setError('');
    const response = await fetch(
      `/api/v1/app-service/get-app-overview-users/${selectedAppId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        }
      }
    );
    if (response.ok) {
      const data = await response.json();
      setUsers(data.appUsers);
    } else {
      setError(`${response.statusText} [code: ${response.status}]`);
    }
  };

  useEffect(() => {
    if (!selectedAppId) return;
    getAppOverview();
  }, [selectedAppId]);

  return (
    <motion.div
      css={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '60%',
        height: '100%',
        backgroundColor: '#FAFAFA',
        paddingInline: 48,
        paddingBlockStart: 36
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
      <div css={[sharedStyles.col.standard]}>
        <section css={[sharedStyles.col.tight]}>
          <Typography variant='h5'>App Overview</Typography>
          <AppCard name={appOverview?.appName} />
        </section>
        <AppInfo info={appOverview} userCount={users.length} />
        {error ? error : <UserList users={users} />}
      </div>
      <Button
        onClick={onClose}
        css={{ position: 'absolute', top: 8, right: 8 }}
      >
        <CloseIcon size={32} />
      </Button>
    </motion.div>
  );
};

export default Drawer;
