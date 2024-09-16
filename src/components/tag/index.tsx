import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';

type Props = {
  tag: string;
  clickable?: boolean;
  onClick?: () => void;
};
const TagItem = ({ tag, clickable, onClick }: Props) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
      }}
      onClick={onClick}
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={1}
      borderRadius="15px"
      width="fit-content"
      paddingX={0.5}
    >
      <Typography fontSize={12}>{tag}</Typography>
      {clickable && <CloseIcon sx={{ fontSize: 12 }} />}
    </Box>
  );
};

export default TagItem;
