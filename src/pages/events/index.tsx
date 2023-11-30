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
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchEvents } from 'src/utils/api'

const Events = () => {
  const router = useRouter()

  const { data } = useQuery('fetchForms', fetchEvents, {
    refetchOnWindowFocus: false
  })

  return (
    <>
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
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(ev => (
                  <TableRow
                    hover
                    key={ev.name}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                    onClick={() => router.push(`/events/${ev.id}`)}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{ev.name}</Typography>
                        <Typography variant='caption'>{ev.description}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{ev.event_date}</TableCell>
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