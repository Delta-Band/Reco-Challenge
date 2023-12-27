/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from '@mui/material';
import sharedStyles from '../sharedStyles';

interface UserListItemProps {
  user: string;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  return (
    <div
      css={[
        sharedStyles.row.tight,
        css({
          padding: 16,
          borderBottom: '1px solid #E8E9FF'
        })
      ]}
    >
      <div
        css={theme => ({
          width: 40,
          height: 40,
          backgroundColor: theme.palette.primary.main,
          borderRadius: 40
        })}
      />
      <Typography>{user}</Typography>
    </div>
  );
};

export default UserListItem;
