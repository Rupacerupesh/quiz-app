// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import { Button, CardActions, Collapse, Divider, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'mdi-material-ui'
import { useRouter } from 'next/router'

interface CardHouseProps {
  name: string
  description: string
  roundId: string
}

const CardRounds = (props: CardHouseProps) => {
  const { name, description, roundId } = props

  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  const router = useRouter()
  const routeToDetails = () => router.push(`/rounds/${roundId}`)

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ marginBottom: 2, cursor: 'pointer' }} onClick={routeToDetails}>
            {name}
          </Typography>
        </CardContent>
        <CardActions className='card-action-dense'>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Button onClick={handleClick}>Description</Button>
            <IconButton size='small' onClick={handleClick}>
              {collapse ? <ChevronUp sx={{ fontSize: '1.875rem' }} /> : <ChevronDown sx={{ fontSize: '1.875rem' }} />}
            </IconButton>
          </Box>
        </CardActions>
        <Collapse in={collapse}>
          <Divider sx={{ margin: 0 }} />
          <CardContent>
            <pre>
              <Typography variant='body2'>{description}</Typography>
            </pre>
          </CardContent>
        </Collapse>
      </Card>
    </>
  )
}

export default CardRounds
