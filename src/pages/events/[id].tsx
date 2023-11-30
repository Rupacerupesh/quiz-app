// ** React Imports
import { useState, forwardRef, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import TestCollapsible from 'src/views/tables/TestCollapsible'
import HousesSection from 'src/views/events/HousesSection'
import { FormControl, InputLabel, MenuItem, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Select } from '@mui/material'

import ParticipantsTable from 'src/views/events/ParticipantsTable'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Events, fetchEventById, fetchEvents } from 'src/utils/api'
import { Controller, useForm } from 'react-hook-form'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Event Date' autoComplete='off' />
})

interface HouseTypes {
  name: string
  description: string
  participants: Participants[]
}

interface Participants {
  name: string
  class: string
  captain: string
  house: string
}

const FormLayoutsBasic = () => {
  const router = useRouter()

  // ** States

  const { data: fetchData, refetch } = useQuery([`fetchEventByID`, { eventId: router.query.id }], fetchEventById, {
    refetchOnWindowFocus: false,
    enabled: !!router.query.id
  })

  console.log({ gg: router.query.id })

  const [open, setOpen] = React.useState(false)

  const [data, setData] = useState<HouseTypes[]>([
    { name: 'blue', description: 'Hi I am blue', participants: [] },
    { name: 'red', description: 'Hi I am blue', participants: [] },
    { name: 'green', description: 'Hi I am blue', participants: [] },
    { name: 'yellow', description: 'Hi I am blue', participants: [] },
    { name: 'asd', description: 'Hi I am blue', participants: [] }
  ])

  const addHouseFunction = (args: HouseTypes) => {
    setOpen(true)
    setData(prevState => [...prevState, { ...args }])
  }

  const addParticipants = (participant: Participants) => {
    setOpen(true)

    const houseIndex = data.findIndex(e => e.name === participant.house)

    if (houseIndex >= 0) {
      const newData = [...data]
      const house = newData[houseIndex]

      const participantExists = house.participants.some(i => i.name === participant.name)

      if (participantExists) {
        house.participants = house.participants.filter(p => p.name !== participant.name)
      } else {
        house.participants.push(participant)
      }

      setData(newData)
    }
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const { control, setValue } = useForm<Events>()

  useEffect(() => {
    if (fetchData) {
      setValue('name', fetchData.event.name)
      setValue('description', fetchData.event.description)
      setValue('event_date', fetchData.event.event_date)
      setValue('status', fetchData.event.status)
    }
  }, [fetchData])

  return (
    <DatePickerWrapper>
      <Typography variant='h5'>Edit Event</Typography>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Edit Event' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='name'
                      control={control}
                      defaultValue={fetchData?.event.name}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          defaultValue={fetchData?.event.name}
                          value={fetchData?.event.name}
                          fullWidth
                          label='Name'
                          placeholder='Leonard Carter'
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='event_date'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          dateFormat='yyyy/MM/dd'
                          // selected={eventDate ? new Date(eventDate) : null}
                          showTimeSelect={false}
                          todayButton='Today'
                          customInput={<CustomInput />}
                          dropdownMode='select'
                          isClearable
                          placeholderText='Click to select time'
                          shouldCloseOnSelect
                          required
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='description'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          minRows={3}
                          required
                          label='Description'
                          placeholder='Description...'
                          sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>

                      <Controller
                        name='status'
                        control={control}
                        defaultValue={true}
                        render={({ field }) => (
                          <Select label='Status' {...field}>
                            <MenuItem value='true'>Active</MenuItem>
                            <MenuItem value='false'>Inactive</MenuItem>
                          </Select>
                        )}
                      />
                    </FormControl>
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
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {fetchData?.houses ? (
        <HousesSection refetch={refetch} eventID={router.query.id as string} houses={fetchData.houses} />
      ) : null}

      <Box mt={10}>{fetchData?.houses ? <ParticipantsTable participants={fetchData?.houses} /> : null}</Box>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity='success' sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </DatePickerWrapper>
  )
}

export default FormLayoutsBasic
