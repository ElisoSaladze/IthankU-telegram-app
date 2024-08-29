import { CircularProgress } from '@mui/material';

type Props = {
  centered?: boolean;
};

export const Progress = ({ centered }: Props) => {
  return centered ? (
    <CircularProgress
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  ) : (
    <CircularProgress />
  );
};
