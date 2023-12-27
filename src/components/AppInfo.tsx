/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import { AppItem } from '../models';
import sharedStyles from '../sharedStyles';

interface AppInfoProps {
  info?: AppItem;
  userCount?: number;
}

const AppInfo: React.FC<AppInfoProps> = ({ info, userCount }) => {
  return (
    <div
      css={[
        sharedStyles.col.tight,
        theme =>
          css({
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 4,
            padding: 16,
            background: 'rgba(62, 116, 255, 0.05)'
          })
      ]}
    >
      <Typography>App name: {info?.appName}</Typography>
      <Typography>Category: {info?.category}</Typography>
      <Typography>Users: {userCount}</Typography>
      <Typography>Connector: {info?.appSources[0]}</Typography>
    </div>
  );
};

export default AppInfo;
