import CircleIcon from '@mui/icons-material/Circle'
import { Box, Typography } from '@mui/material'

type Props = {
  color: string
  name: string
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
}

const ShadeComponent = ({
  color,
  name,
  selectable = false,
  selected = false,
  onSelect,
}: Props) => {
  return (
    <Box
      onClick={() => selectable && onSelect?.()}
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={`1px solid ${selected ? '#21A54D' : '#000000'}`}
      borderRadius="15px"
      width="fit-content"
      paddingRight={0.5}
      gap={0.5}
      boxShadow={selected ? '0px 2px 5.3px 0px #21A54D7D' : 'none'}
      sx={{ cursor: 'pointer' }}
    >
      <CircleIcon fontSize="small" sx={{ color: color }} />
      <Typography fontSize={12} color={selected ? 'primary' : 'inherit'}>
        {name}
      </Typography>
    </Box>
  )
}

export default ShadeComponent
