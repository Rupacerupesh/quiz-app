// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Icons Imports
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { MenuItem, Select } from '@mui/material'
import React from 'react'
import { Events, postEvent } from 'src/utils/api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Event Date' autoComplete='off' />
})

const FormLayoutsBasic = () => {
  const { handleSubmit, control, watch } = useForm<Events>()

  const router = useRouter()

  const eventDate = watch('event_date')

  const mutation = useMutation({
    mutationFn: postEvent,
    onSuccess: data => router.push(`/events/${data.id}`)
  })

  const onSubmit: SubmitHandler<Events> = data =>
    mutation.mutate({ ...data, event_date: format(data.event_date as unknown as Date, 'yyyy-MM-dd') })

  return (
    <DatePickerWrapper>
      <Typography variant='h5'>Add new Event</Typography>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Add new Event' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='name'
                      control={control}
                      defaultValue=''
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField {...field} fullWidth label='Name' placeholder='Leonard Carter' required />
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
                          selected={eventDate ? new Date(eventDate) : null}
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
                            <MenuItem value='false'>InActive</MenuItem>
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
    </DatePickerWrapper>
  )
}

export default FormLayoutsBasic
