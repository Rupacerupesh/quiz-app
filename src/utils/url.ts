export const url = {
  getEvents: '/events',
  postEvent: '/event',
  getEventById: '/event/:eventId',
  postHouse: '/house',
  postParticipant: '/participant',
  getHouses: '/houses',
  getParticipants: '/participants',
  getRounds: '/rounds',
  postRound: '/round',
  getRoundById: '/round/:roundId',
  getRoundPoints: '/round-points',
  postRoundPoints: '/round-point',
  getCategories: '/categories',
  postCategory: '/category',
  eventRounds: 'event-rounds/_bulk',
  createSession: 'event/:eventId/session',
  getLeaderBoard: 'leaderboard/:sessionId',
  createLeaderBoard: 'event/:eventId/leaderboard/:sessionId'
}
export default url
