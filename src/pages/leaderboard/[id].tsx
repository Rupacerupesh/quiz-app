// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, Box, Button, CardHeader, Grid, styled } from '@mui/material'
import { useQuery } from 'react-query'
import { fetchLeaderBoard } from 'src/utils/api'
import PointsInput from 'src/views/leaderboard/PointsInput'
import { useRouter } from 'next/router'

const TrophyImg = styled('img')({
  height: 50
})

const LeaderBoard = () => {
  const router = useRouter()

  // ** State
  const [value, setValue] = useState<string>('')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const { data, refetch } = useQuery(['fetchLeaderBoard', { sessionId: router.query.id }], fetchLeaderBoard, {
    refetchOnWindowFocus: false,
    enabled: !!router.query.id
  })

  useEffect(() => {
    if (data && !value && data.leader_board[0]?.round_name) {
      setValue(data.leader_board[0].round_name)
    }
  }, [data])

  const totalData =
    data?.houses
      .map(e => {
        let point = 0

        data.leader_board.forEach(item => {
          const houseData = item.houses.find(house => house.house_name === e.house_name)

          if (houseData) {
            point = point + houseData.score
          }
        })

        return {
          name: e.house_name,
          point: point,
          color: e.color_code
        }
      })
      .sort((a, b) => b.point - a.point) ?? []

  const renderContent = () => {
    const selectedRound = data?.leader_board.find(e => e.round_name === value)

    if (!selectedRound) return null

    return (
      <CardContent>
        <TabPanel key={selectedRound.round_id} value={selectedRound.round_name} sx={{ p: 0 }}>
          <Typography variant='h6' sx={{ marginBottom: 2, textAlign: 'center' }}>
            {selectedRound.round_name}
          </Typography>

          {data?.houses.map(e => (
            <CardContent key={e.id}>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={3}>
                  <Typography variant='h6'>{e.house_name}</Typography>

                  <Typography
                    sx={{
                      lineHeight: 1.5
                    }}
                  >
                    {selectedRound.houses.find(item => item.house_id === e.id)?.score ?? 0} pts
                  </Typography>
                </Grid>

                <PointsInput
                  houseName={e.house_name}
                  eventId={data.event_id}
                  sessionId={data.session_id}
                  refetch={refetch}
                  roundId={selectedRound.event_round_id}
                  houseId={e.id}
                />
              </Grid>
            </CardContent>
          ))}
        </TabPanel>
      </CardContent>
    )
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>LeaderBoard</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button
            size='medium'
            variant='contained'
            color='primary'
            onClick={() => window.open(data?.redirect_url, '_blank', 'noreferrer')}
          >
            View ScoreBoard
          </Button>
        </Grid>

        <Grid item md={6} xs={12} marginBottom={10}>
          <Card>
            <CardHeader
              title={
                <>
                  <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
                  Rank
                </>
              }
              titleTypographyProps={{ sx: { lineHeight: '1.2 !important', letterSpacing: '0.31px !important' } }}
            />
            <CardContent sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              {totalData?.map((e, index: number) => (
                <Box
                  key={e.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ...(index !== totalData.length - 1 ? { mb: 5.875 } : {})
                  }}
                >
                  <Avatar
                    sx={{
                      width: 38,
                      height: 38,
                      marginRight: 3,
                      fontSize: '1rem',
                      color: 'common.white',
                      backgroundColor: e.color
                    }}
                  >
                    {index + 1}
                  </Avatar>

                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ mr: 0.5, fontWeight: 600, letterSpacing: '0.25px' }}>{e.name}</Typography>
                      </Box>
                      <Typography
                        variant='caption'
                        sx={{
                          lineHeight: 1.5
                        }}
                      >
                        {e.point} pts
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12} marginBottom={10}>
          <Card>
            <TabContext value={value}>
              <Grid container spacing={6}>
                <Grid item md={3}>
                  <TabList onChange={handleChange} aria-label='card navigation example' orientation='vertical'>
                    {data?.leader_board.map(e => (
                      <Tab key={e.round_id} value={e.round_name} label={e.round_name} />
                    ))}
                  </TabList>
                </Grid>
                <Grid item md={9}>
                  {renderContent()}
                </Grid>
              </Grid>
            </TabContext>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default LeaderBoard
