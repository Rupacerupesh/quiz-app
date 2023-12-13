// ** React Imports
import { forwardRef, useEffect } from 'react'

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
import HousesSection from 'src/views/events/HousesSection'
import { FormControl, InputLabel, MenuItem, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Select } from '@mui/material'

import ParticipantsTable from 'src/views/events/ParticipantsTable'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Events, fetchEventById } from 'src/utils/api'
import { Controller, useForm } from 'react-hook-form'
import RoundsSection from 'src/views/events/RoundsSection'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Event Date' autoComplete='off' />
})

const FormLayoutsBasic = () => {
  const router = useRouter()

  // ** States

  const { data: fetchData, refetch } = useQuery([`fetchEventByID`, { eventId: router.query.id }], fetchEventById, {
    refetchOnWindowFocus: false,
    enabled: !!router.query.id
  })

  const [open, setOpen] = React.useState(false)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const { control, setValue, watch } = useForm<Events>()

  useEffect(() => {
    if (fetchData) {
      setValue('name', fetchData.event.name)
      setValue('description', fetchData.event.description)
      setValue('event_date', new Date(fetchData.event.event_date) as unknown as string)
      setValue('status', fetchData.event.status)
    }
  }, [fetchData])

  const eventDate = watch('event_date')

  return (
    <DatePickerWrapper>
      <Typography variant='h5'>Edit Event</Typography>

      <Grid container spacing={6} mt={4}>
        <Grid item lg={12}>
          <Card>
            <CardHeader title='Edit Event' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='name'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField {...field} fullWidth required label='Name' placeholder='Leonard Carter' />
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
                          selected={eventDate ? new Date(eventDate) : null}
                          dateFormat='yyyy/MM/dd'
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
                        defaultValue={false}
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
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {fetchData?.rounds ? (
        <RoundsSection refetch={refetch} eventID={router.query.id as string} rounds={fetchData.rounds} />
      ) : null}

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
