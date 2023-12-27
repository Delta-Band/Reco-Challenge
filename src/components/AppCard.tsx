/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Typography } from '@mui/material';
import sharedStyles from '../sharedStyles';

interface AppCardProps {
  name?: string;
}

const AppCard: React.FC<AppCardProps> = ({ name }) => {
  return (
    <div css={[sharedStyles.row.tight]}>
      <div
        css={theme => ({
          width: 40,
          height: 40,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 40
        })}
      />
      <Typography>{name}</Typography>
    </div>
  );
};

export default AppCard;
