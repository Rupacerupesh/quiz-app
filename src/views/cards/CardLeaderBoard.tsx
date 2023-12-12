// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

interface Leaderboard {
  id: string
  session_id: string
  event_id: string
  rounds: Rounds
}

interface Rounds {
  id: string
  event_round_id: string
  name: string
  houses: House[]
}

interface House {
  id: string
  name: string
  points: string
}

const CardLeaderBoard = () => {
  // ** State
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example' variant='scrollable' scrollButtons='auto'>
          <Tab value='1' label='Item One' />
          <Tab value='2' label='Item Two' />
          <Tab value='3' label='Item Three' />
          <Tab value='4' label='Item Four' />
          <Tab value='5' label='Item Three' />
          <Tab value='6' label='Item Six' />
          <Tab value='7' label='Item Three' />
          <Tab value='8' label='Item Eight' />
          <Tab value='9' label='Item Three' />
          <Tab value='10' label='Item Three' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header One
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Pudding tiramisu caramels. Gingerbread gummies danish chocolate bar toffee marzipan. Wafer wafer cake
              powder danish oat cake.
            </Typography>
            <Button variant='contained'>Button One</Button>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header Two
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Dragée chupa chups soufflé cheesecake jelly tootsie roll cupcake marzipan. Carrot cake sweet roll gummi
              bears caramels jelly beans.
            </Typography>
            <Button variant='contained'>Button Two</Button>
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Header Three
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Icing cake macaroon macaroon jelly chocolate bar. Chupa chups dessert dessert soufflé chocolate bar
              jujubes gummi bears lollipop.
            </Typography>
            <Button variant='contained'>Button Three</Button>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardLeaderBoard
