// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import { Button, Grid, Modal, TextField } from '@mui/material'
import React from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { Categories, postCategory } from 'src/utils/api'
import { useMutation } from 'react-query'
import CardCategories from '../cards/CardCategories'

interface CardHouseProps {
  categories: Categories[]
  roundID: string
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

const CategoriesSection = (props: CardHouseProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { categories, roundID, refetch } = props

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<Categories>()

  const mutation = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      reset()
      refetch()
      handleClose()
    }
  })

  const onSubmit: SubmitHandler<Categories> = data => mutation.mutate({ ...data, attempt_number: 1, round_id: roundID })

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
            Add Category
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='category_name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => <TextField fullWidth {...field} label='Name' placeholder='Leonard Carter' />}
                  />

                  {errors.category_name && <span>This field is required</span>}
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='time_limit'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label='Time Limit'
                        type='number'
                        placeholder='Time Limit'
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='point'
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <TextField fullWidth {...field} label='Points' placeholder='Leonard Carter' type='number' />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='negative_points'
                    control={control}
                    defaultValue={0}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        {...field}
                        label='Negative Points'
                        placeholder='Leonard Carter'
                        type='number'
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
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={6} mt={4}>
        <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h5'>Categories</Typography>

            <Button size='medium' variant='contained' color='primary' onClick={handleOpen}>
              Add New Category
            </Button>
          </Box>
        </Grid>

        {categories?.map(item => (
          <Grid key={item.id} xs={12} sm={6} md={4} item>
            <CardCategories name={item.category_name} point={item.point} negativePoint={item.negative_points} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CategoriesSection
