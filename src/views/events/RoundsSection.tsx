// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import {
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme
} from '@mui/material'
import React, { useEffect } from 'react'

import { Rounds, fetchRounds, postRoundsOnEvents } from 'src/utils/api'
import { useMutation, useQuery } from 'react-query'
import CardRounds from '../cards/CardRounds'

interface CardHouseProps {
  rounds: Rounds[]
  eventID: string
  refetch: () => void
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

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 10
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const RoundsSection = (props: CardHouseProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { rounds, eventID, refetch } = props

  const mutation = useMutation({
    mutationFn: postRoundsOnEvents,
    onSuccess: () => {
      refetch()
      handleClose()
    }
  })

  const { data: availableRounds } = useQuery('fetchRounds', fetchRounds, {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (open) {
      setPersonName(rounds.map(e => e.round_name))
    }
  }, [open])

  const theme = useTheme()
  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event

    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const onSubmit = () => {
    const roundIds = availableRounds?.filter(e => personName.includes(e.round_name)).map(e => e.round_id) ?? []
    mutation.mutate({ event_id: eventID, round_ids: roundIds })
  }

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
            Add Rounds
          </Typography>
          <Box mt={4}>
            <form>
              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id='demo-multiple-chip-label'>Rounds</InputLabel>
                    <Select
                      labelId='demo-multiple-chip-label'
                      id='demo-multiple-chip'
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput id='select-multiple-chip' label='Rounds' />}
                      renderValue={selected => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map(value => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {availableRounds?.map(round => (
                        <MenuItem
                          key={round.round_id}
                          value={round.round_name}
                          style={getStyles(round.round_name, personName, theme)}
                        >
                          {round.round_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Button variant='contained' onClick={onSubmit}>
                    Add
                  </Button>
                </Box>
              </Grid>
            </form>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {<Typography variant='h5'>{rounds.length > 0 ? 'Rounds' : ''} </Typography>}

            <Button size='medium' variant='contained' color='primary' onClick={handleOpen}>
              Add Rounds
            </Button>
          </Box>
        </Grid>

        {rounds?.map(item => (
          <Grid key={item.round_id} xs={12} sm={6} md={4} item>
            <CardRounds name={item.round_name} description={item.round_description} roundId={item.round_id} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default RoundsSection
