/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';
import { AppItem } from '../models';
import AppCard from './AppCard';
import sharedStyles from '../sharedStyles';
import AppInfo from './AppInfo';

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
  //   const [overviewData, setOverviewData] = useState<any>(null);
  const getAppOverview: () => Promise<void> = async () => {
    try {
      const response = await fetch(
        `/api/v1/app-service/get-app-overview/${selectedAppId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
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
        <AppInfo info={appOverview} />
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
