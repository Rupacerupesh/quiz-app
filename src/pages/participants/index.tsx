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
import { fetchParticipants } from 'src/utils/api'
import { isValidColorCode, isTextColorWhite } from 'src/utils/colors'

const Participants = () => {
  const { data } = useQuery('fetchHouses', fetchParticipants, {
    refetchOnWindowFocus: false
  })

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h5'>Participants</Typography>
      </Grid>
      <Grid marginTop={4}>
        <Card>
          <TableContainer>
            <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
              <TableHead>
                <TableRow>
                  <TableCell>Profile Pic</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>House</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(row => (
                  <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <img src={row.image_path} alt={row.name} width={80} height={80} />
                    </TableCell>

                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                        <Typography variant='caption'>{row.is_captain ? 'Captain' : ''}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.grade}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.house_name}
                        color={'info'}
                        sx={{
                          backgroundColor: isValidColorCode(row.color_code) ? row.color_code : 'blue',
                          color: isTextColorWhite(row.color_code) ? 'gray' : 'common.white',
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
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

export default Participants
