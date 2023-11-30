// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import { Button, Grid, Modal, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import CardHouses from '../cards/CardHouses'
import CardFacebook from '../cards/CardFacebook'
import CardLinkedIn from '../cards/CardLinkedIn'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { HouseType, Participants, postHouse } from 'src/utils/api'
import { useMutation, useQueryClient } from 'react-query'

interface CardHouseProps {
  houses: HouseType[]
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

const HousesSection = (props: CardHouseProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { houses, eventID, refetch } = props

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<HouseType>()

  const mutation = useMutation({
    mutationFn: postHouse,
    onSuccess: () => {
      reset()
      refetch()
      handleClose()
    }
  })

  const onSubmit: SubmitHandler<HouseType> = data => mutation.mutate({ ...data, event_id: eventID })

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
            Add house
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='house_name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField {...field} label='Name' placeholder='Leonard Carter' />}
                  />

                  {errors.house_name && <span>This field is required</span>}
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='color_code'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField {...field} label='ColorCode' placeholder='Leonard Carter' />}
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
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h5'>Houses</Typography>

            <Button size='medium' variant='contained' color='primary' onClick={handleOpen}>
              Add New House
            </Button>
          </Box>
        </Grid>

        {houses?.map(item => (
          <Grid key={item.house_name} xs={12} sm={6} md={4} item>
            <CardHouses
              refetch={refetch}
              name={item.house_name}
              description={item.color_code}
              houseID={item.house_id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default HousesSection
