// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import { Button, IconButton, Modal } from '@mui/material'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { createSession, fetchEvents } from 'src/utils/api'
import { format } from 'date-fns'
import PlayCircle from 'mdi-material-ui/PlayCircle'
import DotsGrid from 'mdi-material-ui/DotsGrid'
import { useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const Events = () => {
  const router = useRouter()

  const { data, refetch } = useQuery('fetchForms', fetchEvents, {
    refetchOnWindowFocus: false
  })

  const mutation = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      refetch()
      window.open(data.redirect_url, '_blank', 'noreferrer')
    }
  })

  const [open, setOpen] = useState<null | string>(null)
  const handleClose = () => setOpen(null)

  const modalData = data?.find(e => e.id === open)

  const renderModalContent = () => {
    const gg = data?.find(e => e.id === open)

    if (gg?.session && gg?.session?.length > 0) {
      return gg?.session.map(session => (
        <TableRow hover key={session.id}>
          <TableCell>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{session.session_id}</Typography>
          </TableCell>

          <TableCell>
            <IconButton
              size='small'
              aria-label='settings'
              className='card-more-options'
              sx={{ color: 'text.secondary' }}
              onClick={() => window.open(session.redirect_url, '_blank', 'noreferrer')}
            >
              <PlayCircle />
            </IconButton>

            <Button
              size='small'
              variant='outlined'
              onClick={() => router.push(`leaderboard/${session.id}`)}
              disabled={!session.start}
            >
              LeaderBoard
            </Button>
          </TableCell>
        </TableRow>
      ))
    }

    return null
  }

  return (
    <>
      <Modal
        open={!!open && !!modalData}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Sessions
          </Typography>
          <Box mt={4}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table sx={{ minWidth: 800 }} aria-label='table in dashboard' stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Session ID</TableCell>

                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{renderModalContent()}</TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Modal>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Events</Typography>

          <Button size='medium' variant='contained' color='primary' onClick={() => router.push('events/add')}>
            Add New Event
          </Button>
        </Box>
      </Grid>
      <Grid marginTop={4}>
        <Card>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(ev => (
                  <TableRow hover key={ev.name}>
                    <TableCell onClick={() => router.push(`/events/${ev.id}`)} style={{ cursor: 'pointer' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{ev.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='caption'>{ev.description}</Typography>
                    </TableCell>
                    <TableCell width={200}>{format(new Date(ev.event_date), 'yyyy/MM/dd')}</TableCell>
                    <TableCell>
                      <IconButton
                        size='small'
                        aria-label='settings'
                        className='card-more-options'
                        sx={{ color: 'text.secondary' }}
                        onClick={() => mutation.mutate(ev.id)}
                      >
                        <PlayCircle />
                      </IconButton>

                      <IconButton
                        disabled={ev.session.length === 0}
                        size='small'
                        aria-label='settings'
                        className='card-more-options'
                        sx={{ color: 'text.secondary', marginLeft: 2 }}
                        onClick={() => setOpen(ev.id)}
                      >
                        <DotsGrid />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>
    </>
  )
}

export default Events
