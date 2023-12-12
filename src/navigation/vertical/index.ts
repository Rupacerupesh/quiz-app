// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Calendar from 'mdi-material-ui/Calendar'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import CalendarSync from 'mdi-material-ui/CalendarSync'
import Medal from 'mdi-material-ui/Medal'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Events',
      icon: Calendar,
      path: '/events'
    },
    {
      title: 'Houses',
      icon: HomeOutline,
      path: '/houses'
    },
    {
      title: 'Participants',
      icon: AccountGroup,
      path: '/participants'
    },
    {
      title: 'Rounds',
      icon: CalendarSync,
      path: '/rounds'
    },
    {
      title: 'Leaderboard',
      icon: Medal,
      path: '/leaderboard'
    }
  ]
}

export default navigation
