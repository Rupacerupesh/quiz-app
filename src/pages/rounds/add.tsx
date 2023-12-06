// ** React Imports

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
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React from 'react'
import { Rounds, postRound } from 'src/utils/api'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'

const AddRound = () => {
  const { handleSubmit, control } = useForm<Rounds>()

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: postRound,
    onSuccess: data => router.push(`/rounds/${data.id}`)
  })

  const onSubmit: SubmitHandler<Rounds> = data => mutation.mutate(data)

  return (
    <DatePickerWrapper>
      <Typography variant='h5'>Add new Round</Typography>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Add new Round' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='round_name'
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
                      name='round_description'
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

export default AddRound
