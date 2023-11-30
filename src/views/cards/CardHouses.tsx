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
import {
  Button,
  ButtonProps,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  styled
} from '@mui/material'
import React, { ChangeEvent, ElementType, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Participants, postParticipant } from 'src/utils/api'

interface CardHouseProps {
  name: string
  description: string
  refetch: () => void
  houseID: string
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

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const CardHouses = (props: CardHouseProps) => {
  const { name, refetch, houseID } = props

  const [openParticipantModal, setOpenParticipantModal] = React.useState(false)
  const handleOpenParticipantModal = () => setOpenParticipantModal(true)
  const handleCloseParticipantModal = () => setOpenParticipantModal(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<Participants>({})

  // const onSubmit: SubmitHandler<Participants> = data => mutation.mutate({ ...data, house_id: houseID })
  const onSubmit: SubmitHandler<Participants> = data =>
    mutation.mutate({ house_id: houseID, grade: data.grade, name: data.name, is_captain: true })

  const mutation = useMutation({
    mutationFn: postParticipant,
    onSuccess: () => {
      reset()
      refetch()
      handleCloseParticipantModal()
    }
  })

  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  return (
    <>
      <Modal
        open={openParticipantModal}
        onClose={handleCloseParticipantModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Add Participant
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ImgStyled src={imgSrc} alt='Profile Pic' />
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                          Upload
                          <input
                            hidden
                            type='file'
                            onChange={onChange}
                            accept='image/png, image/jpeg'
                            id='account-settings-upload-image'
                          />
                        </ButtonStyled>
                        <ResetButtonStyled
                          color='error'
                          variant='outlined'
                          onClick={() => setImgSrc('/images/avatars/1.png')}
                        >
                          Reset
                        </ResetButtonStyled>
                      </Box>
                      <Typography variant='body2' sx={{ marginTop: 5 }}>
                        Allowed PNG or JPEG. Max size of 800K.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* 
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name={'picture'}
                    rules={{ required: 'Recipe picture is required' }}
                    render={({ field }) => {
                      return (
                        <input
                          {...field}
                          type='file'
                          value={field.name}
                          id='picture'
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.onChange(event.target.files)}
                        />
                      )
                    }}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='name'
                    rules={{ required: true }}
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField {...field} label='Name' placeholder='Leonard Carter' required />}
                  />

                  {errors.name && <span>This field is required</span>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='grade'
                    control={control}
                    rules={{ required: true }}
                    defaultValue=''
                    render={({ field }) => <TextField {...field} label='Grade' placeholder='7' required />}
                  />

                  {errors.grade && <span>This field is required</span>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Captain</InputLabel>

                    <Controller
                      name='is_captain'
                      control={control}
                      defaultValue={true}
                      render={({ field }) => (
                        <Select label='Captain' {...field}>
                          <MenuItem value='1'>Captain</MenuItem>
                          <MenuItem value='0'>Not Captain</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name='house_id'
                    control={control}
                    defaultValue={name}
                    render={({ field }) => <TextField {...field} label='House' placeholder='7' disabled />}
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

      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'info.main' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(4)} !important` }}>
          <Typography
            variant='h6'
            sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
          >
            <HomeOutline sx={{ marginRight: 2.5 }} />
            {name}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
                <Button type='submit' variant='contained' size='small' onClick={handleOpenParticipantModal}>
                  Add Participant
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default CardHouses
