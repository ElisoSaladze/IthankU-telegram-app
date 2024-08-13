import { Box, CircularProgress } from '@mui/material'

/**
 * Loader component renders a circular loading indicator centered within a container.
 *
 * @component
 * @returns {JSX.Element} The rendered Loader component.
 */
const Loader = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  )
}
export default Loader
