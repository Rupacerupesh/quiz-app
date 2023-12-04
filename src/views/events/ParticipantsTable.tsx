// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { HouseType } from 'src/utils/api'
import { isValidColorCode, isTextColorWhite } from 'src/utils/colors'
import { Grid } from '@mui/material'

interface ParticipantsTableProps {
  participants: HouseType[]
}

const ParticipantsTable = (props: ParticipantsTableProps) => {
  const { participants } = props

  return (
    <>
      <Grid item xs={12} sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Participants</Typography>
        </Box>
      </Grid>

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
              {participants.map(h =>
                h.participants?.map(p => (
                  <TableRow hover key={p.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <img src={p.image_path} alt={p.name} width={80} height={80} />
                    </TableCell>

                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{p.name}</Typography>
                        <Typography variant='caption'>{p.is_captain ? 'Captain' : ''}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{p.grade}</TableCell>
                    <TableCell>
                      <Chip
                        label={h.house_name}
                        color={'info'}
                        sx={{
                          backgroundColor: isValidColorCode(h.color_code) ? h.color_code : 'blue',
                          color: isTextColorWhite(h.color_code) ? 'gray' : 'common.white',
                          height: 24,
                          fontSize: '0.75rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { fontWeight: 500 }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}

export default ParticipantsTable
