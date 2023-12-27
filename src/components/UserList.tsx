/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';
import { AppItem } from '../models';
import AppCard from './AppCard';
import sharedStyles from '../sharedStyles';
import UserListItem from './UserListItem';

interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div
      css={[
        sharedStyles.col.tight,
        css({
          gap: 0,
          background: '#FFFFFF',
          borderRadius: 8,
          height: 'calc(100vh - 364px)',
          overflow: 'auto'
        })
      ]}
    >
      <Typography
        css={{
          padding: 16,
          borderBottom: '1px solid #E8E9FF'
        }}
        variant='h6'
      >
        Username
      </Typography>
      {users.map(user => (
        <UserListItem key={user} user={user} />
      ))}
    </div>
  );
};

export default UserList;
