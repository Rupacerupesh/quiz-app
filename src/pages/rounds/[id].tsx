// ** React Imports
import { useEffect } from 'react'

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
import { AlertTitle, Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Rounds, fetchRoundById } from 'src/utils/api'
import { Controller, useForm } from 'react-hook-form'
import RoundPointsList from 'src/views/rounds/RoundPointsList'
import CategoriesSection from 'src/views/rounds/CategoriesSection'
import Editor from 'src/views/shared/Editor'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const EditRound = () => {
  const router = useRouter()

  // ** States

  const { data: fetchData, refetch } = useQuery([`fetchRoundByID`, { roundId: router.query.id }], fetchRoundById, {
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

  const {
    control,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm<Rounds>()

  const onChange = (val: string) => {
    setValue('round_description', val)
    clearErrors('round_description')
  }

  useEffect(() => {
    if (fetchData) {
      setValue('round_name', fetchData.round_name)
      setValue('round_description', fetchData.round_description)
    }
  }, [fetchData])

  return (
    <DatePickerWrapper>
      <Typography variant='h5'>Edit Round</Typography>

      <Grid spacing={6} mt={4}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title='Edit Round' titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
              <form>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Controller
                      name='round_name'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <TextField {...field} fullWidth required label='Name' placeholder='Leonard Carter' />
                      )}
                    />
                  </Grid>

                  {fetchData?.round_description && (
                    <Grid item xs={12}>
                      <Editor onChange={onChange} initialValue={fetchData?.round_description} />
                      {errors.round_description && (
                        <Alert severity='error' sx={{ marginTop: 4 }}>
                          <AlertTitle>This field is required</AlertTitle>
                        </Alert>
                      )}
                    </Grid>
                  )}

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

      {fetchData?.categories ? (
        <CategoriesSection refetch={refetch} roundID={router.query.id as string} categories={fetchData.categories} />
      ) : null}

      <Box mt={10}>
        <RoundPointsList
          refetch={refetch}
          roundId={(router.query.id as string) ?? ''}
          roundPointsData={fetchData?.round_points ?? []}
        />
      </Box>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity='success' sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </DatePickerWrapper>
  )
}

export default EditRound
