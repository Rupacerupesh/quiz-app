// ** MUI Imports

// ** Icons Imports
import { Button, Grid, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'

import { postLeaderBoard } from 'src/utils/api'
import { useMutation } from 'react-query'

import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

interface PointsInputProps {
  refetch: () => void
  roundId: string
  houseId: string
  eventId: string
  sessionId: string
  houseName: string
}

const PointsInput = (props: PointsInputProps) => {
  const { roundId, houseId, refetch, eventId, sessionId, houseName } = props

  const mutation = useMutation({
    mutationFn: postLeaderBoard,
    onSuccess: () => {
      setOpen(value)
      setValue(0)
      refetch()
    }
  })

  const [value, setValue] = useState(0)

  const onSubmit = () => {
    mutation.mutate({
      round_id: roundId,
      house_id: houseId,
      point: value,
      event_id: eventId,
      session_id: sessionId
    })
  }

  const onChangeValue = (e: any) => {
    setValue(parseInt(e.target.value))
  }
  const [open, setOpen] = React.useState<number | null>(null)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(null)
  }

  return (
    <>
      <Grid item xs={12} sm={3}>
        <TextField
          type='number'
          size='small'
          label='Points'
          defaultValue={value}
          onChange={onChangeValue}
          value={value}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button variant='contained' onClick={onSubmit}>
          Add
        </Button>
      </Grid>

      <Snackbar
        open={!!open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          {open} Points Added to {houseName} house
        </Alert>
      </Snackbar>
    </>
  )
}

export default PointsInput
