// ** MUI Imports

// ** Icons Imports
import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'

import { postLeaderBoard } from 'src/utils/api'
import { useMutation } from 'react-query'

interface PointsInputProps {
  refetch: () => void
  roundId: string
  houseId: string
  eventId: string
  sessionId: string
}

const PointsInput = (props: PointsInputProps) => {
  const { roundId, houseId, refetch, eventId, sessionId } = props

  const mutation = useMutation({
    mutationFn: postLeaderBoard,
    onSuccess: () => {
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
    </>
  )
}

export default PointsInput
