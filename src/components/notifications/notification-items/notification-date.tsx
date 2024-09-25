import { Typography } from '@mui/material';
import { formatDuration, intervalToDuration } from 'date-fns';

type Props = {
  date: string;
};

export const NotificationDate = ({ date }: Props) => {
  const duration = intervalToDuration({
    start: new Date(date),
    end: new Date(),
  });
  return (
    <Typography fontSize={10} color="#8B8B8B">
      {formatDuration(duration, {
        delimiter: ', ',
        format: ['weeks', 'days', 'minutes'],
      })}
    </Typography>
  );
};
