// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { RoundsPoints, postRoundPoint } from 'src/utils/api'
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

interface RoundPointsListProps {
  roundPointsData: RoundsPoints[]
  refetch: () => void
  roundId: string
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const RoundPointsList = (props: RoundPointsListProps) => {
  const { roundPointsData, refetch, roundId } = props

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { handleSubmit, control, reset } = useForm<RoundsPoints>()

  const mutation = useMutation({
    mutationFn: postRoundPoint,
    onSuccess: () => {
      reset()
      refetch()
      handleClose()
    }
  })

  const onSubmit: SubmitHandler<RoundsPoints> = data => mutation.mutate({ ...data, round_id: roundId })

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Round Point
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='attempt_number'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label='Attempt Number'
                        type='number'
                        placeholder='Attempt Number'
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='time_limit'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label='Time Limit'
                        type='number'
                        placeholder='Time Limit'
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='points'
                    control={control}
                    render={({ field }) => (
                      <TextField fullWidth {...field} label='Points' type='number' placeholder='Points' required />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='negative_points'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label='Negative Points'
                        type='number'
                        placeholder='Negative Points'
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button type='submit' variant='contained'>
                      Add
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>

      <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Round Points</Typography>

          <Button size='medium' variant='contained' color='primary' onClick={handleOpen}>
            Add New Round Point
          </Button>
        </Box>
      </Grid>

      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Attempt Number</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Negative Points</TableCell>
                <TableCell>Time Limit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roundPointsData?.map(roundPoint => (
                <TableRow
                  hover
                  key={roundPoint.attempt_number}
                  sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                >
                  <TableCell>{roundPoint.attempt_number}</TableCell>

                  <TableCell>
                    <Chip
                      label={roundPoint.points}
                      color={'info'}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={roundPoint.negative_points}
                      color={'error'}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                  <TableCell>{roundPoint.time_limit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default RoundPointsList
