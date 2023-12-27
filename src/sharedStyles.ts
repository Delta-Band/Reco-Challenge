import { css } from '@emotion/react';

const row = {
  standard: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  }),
  tight: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  })
};

const col = {
  standard: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }),
  tight: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  })
};

export default {
  row,
  col
};
