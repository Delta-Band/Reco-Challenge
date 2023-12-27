/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
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
