import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
type Props = {
  image: File
  remove: () => void
}
const PreviewImg = ({ image, remove }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <img
        style={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 8,
          overflow: 'hidden',
        }}
        src={URL.createObjectURL(image)}
        alt="idk"
      />
      <IconButton
        onClick={remove}
        sx={{
          backgroundColor: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.dark',
          },
          position: 'absolute',
          top: -10,
          right: -10,
        }}
      >
        <CloseIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  )
}

export default PreviewImg
