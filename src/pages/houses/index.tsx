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
import Chip from '@mui/material/Chip'
import { useQuery } from 'react-query'
import { fetchHouses } from 'src/utils/api'
import { isTextColorWhite, isValidColorCode } from 'src/utils/colors'

const Houses = () => {
  const { data } = useQuery('fetchHouses', fetchHouses, {
    refetchOnWindowFocus: false
  })

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h5'>Houses</Typography>
      </Grid>
      <Grid marginTop={4}>
        <Card>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Total Participants</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(row => (
                  <TableRow hover key={row.house_id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Chip
                        label={row.house_name}
                        color='info'
                        sx={{
                          backgroundColor: isValidColorCode(row.color_code) ? row.color_code : 'blue',
                          color: isTextColorWhite(row.color_code) ? 'gray' : 'common.white',
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />

                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='caption'>{row.color_code}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {row.event_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {row.total_participants}
                      </Typography>
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

export default Houses
