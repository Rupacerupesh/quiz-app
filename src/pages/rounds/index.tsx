// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Grid from '@mui/material/Grid'
import { fetchRounds } from 'src/utils/api'
import { useQuery } from 'react-query'
import { Box, Button } from '@mui/material'
import { useRouter } from 'next/router'

const Rounds = () => {
  const { data } = useQuery('fetchRounds', fetchRounds, {
    refetchOnWindowFocus: false
  })

  const router = useRouter()

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Rounds</Typography>

          <Button size='medium' variant='contained' color='primary' onClick={() => router.push('rounds/add')}>
            Add New Round
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
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map(row => (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/rounds/${row.id}`)}
                  >
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {row.round_name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <pre>
                        <Typography variant='caption'>{row.round_description}</Typography>
                      </pre>
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

export default Rounds
