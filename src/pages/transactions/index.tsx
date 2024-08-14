import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TransactionsPage = () => {
  const [list, setList] = useState('incoming')
  const navigate = useNavigate()
  const handleListChange = (
    event: React.MouseEvent<HTMLElement>,
    newList: string,
  ) => {
    if (newList !== null) {
      setList(newList)
    }
  }
  return (
    <Stack margin={2} justifyContent={'center'}>
      <Typography marginBottom={2} textAlign={'center'}>
        Transactions
      </Typography>
      <Stack>
        <ToggleButtonGroup
          color="primary"
          fullWidth
          value={list}
          exclusive
          onChange={handleListChange}
        >
          <ToggleButton value="incoming">Incoming</ToggleButton>
          <ToggleButton value="outgoing">Outgoing</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack></Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}
      >
        <Button
          onClick={() => navigate('/more/pending-transactions')}
          sx={{ padding: 0 }}
        >
          <Typography
            sx={{ textDecoration: 'underline' }}
            textAlign={'end'}
            fontSize={'small'}
            color="primary"
          >
            See Pending Transactions
          </Typography>
          <ArrowForwardIosIcon color="primary" sx={{ height: '10px' }} />
        </Button>
      </Stack>
    </Stack>
  )
}

export default TransactionsPage
