// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Grid, styled } from '@mui/material'
import React from 'react'

interface CardCategories {
  name: string
  point: number
  negativePoint: number
  timeLimit: number
}

const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardCategories = (props: CardCategories) => {
  const { name, point, negativePoint, timeLimit } = props

  return (
    <>
      <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: 'info.main' }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
          <Typography
            variant='h6'
            sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
          >
            {name}
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
              <StyledBox>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' color='common.white'>
                    Points
                  </Typography>
                </Box>
                <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' color='common.white'>
                    Negative Points
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant='body2' color='common.white'>
                    Time Limit
                  </Typography>
                </Box>
              </StyledBox>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' color='common.white'>
                  {point}
                </Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' color='common.white'>
                  {negativePoint}
                </Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' color='common.white'>
                  {timeLimit}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}

export default CardCategories
