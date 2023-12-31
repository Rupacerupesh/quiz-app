import { authHttp } from './http'

import { url } from './url'

export type Events = {
  id: string
  name: string
  description: string
  event_date: string
  status: boolean
  session: Session[]
  participant_url: string
}

export type EventsById = {
  event: Events
  houses: HouseType[]
  rounds: Rounds[]
}

export interface Session {
  end: null | boolean
  start: null | boolean
  id: string
  event_id: string
  session_id: string
  redirect_url: string
}

export interface HouseType {
  house_id: string
  house_name: string
  color_code: string
  participants?: Participants[]
  event_id: string
  event_name: string
  total_participants: string
  id: string
}
export interface Participants {
  id: string
  name: string
  grade: string
  is_captain: boolean
  house_id: string
  image_path: string
  file?: FileList
  house_name: string
  color_code: string
}

export interface Rounds {
  round_id: string
  round_name: string
  round_description: string
  round_points: RoundsPoints[]
  categories: Categories[]
}

export interface RoundsPoints {
  attempt_number: number
  id?: number
  negative_points?: number
  points?: number
  round_id: string
  time_limit: number
}

export interface Categories {
  id: number
  negative_points: number
  point: number
  round_id: string
  category_name: string
  attempt_number: number
  time_limit: number
}

export interface EventRounds {
  event_id: string
  round_ids: string[]
}

export interface LeaderboardRounds {
  round_id: string
  event_round_id: string
  round_name: string
  houses: HousePoints[]
}

export interface HousePoints {
  house_id: string
  house_name: string
  negative_points: number
  score: number
  total_points: number
}
export interface Leaderboard {
  event_id: string
  session_id: string
  houses: HouseType[]
  leader_board: LeaderboardRounds[]
  redirect_url: string
}

export interface LeaderboardScoreFormData {
  round_id: string
  house_id: string
  point: number
  event_id: string
  session_id: string
}

export const fetchEvents = async (): Promise<Events[]> => {
  const response = await authHttp({ url: url.getEvents, method: 'GET' })

  return response.data
}

export const fetchEventById = async ({ queryKey }: { queryKey: any }): Promise<EventsById> => {
  const [, data] = queryKey
  const response = await authHttp({
    url: `${url.getEventById.replace(':eventId', data.eventId)}`,
    method: 'GET'
  })

  return response.data
}

export const postEvent = async (formData: Events) => {
  const response = await authHttp({
    url: url.postEvent,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const postHouse = async (formData: HouseType) => {
  const response = await authHttp({
    url: url.postHouse,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const postParticipant = async (formData: FormData) => {
  const response = await authHttp({
    url: url.postParticipant,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

export const fetchHouses = async (): Promise<HouseType[]> => {
  const response = await authHttp({ url: url.getHouses, method: 'GET' })

  return response.data
}

export const fetchParticipants = async (): Promise<Participants[]> => {
  const response = await authHttp({ url: url.getParticipants, method: 'GET' })

  return response.data
}

export const fetchRounds = async (): Promise<Rounds[]> => {
  const response = await authHttp({ url: url.getRounds, method: 'GET' })

  return response.data
}

export const fetchCategories = async (): Promise<Categories[]> => {
  const response = await authHttp({ url: url.getCategories, method: 'GET' })

  return response.data
}

export const fetchRoundById = async ({ queryKey }: { queryKey: any }): Promise<Rounds> => {
  const [, data] = queryKey

  const response = await authHttp({
    url: `${url.getRoundById.replace(':roundId', data.roundId)}`,
    method: 'GET'
  })

  return response.data
}

export const fetchRoundPoints = async (): Promise<RoundsPoints[]> => {
  const response = await authHttp({ url: url.getRoundPoints, method: 'GET' })

  return response.data
}

export const postRound = async (formData: Rounds) => {
  const response = await authHttp({
    url: url.postRound,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const postRoundPoint = async (formData: RoundsPoints) => {
  const response = await authHttp({
    url: url.postRoundPoints,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const postCategory = async (formData: Categories) => {
  const response = await authHttp({
    url: url.postCategory,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const postRoundsOnEvents = async (formData: EventRounds) => {
  const response = await authHttp({
    url: url.eventRounds,
    method: 'POST',
    data: formData
  })

  return response.data
}

export const createSession = async (eventId: string) => {
  const response = await authHttp({
    url: `${url.createSession.replace(':eventId', eventId)}`,
    method: 'POST',
    data: {}
  })

  return response.data
}

export const fetchLeaderBoard = async ({ queryKey }: { queryKey: any }): Promise<Leaderboard> => {
  const [, data] = queryKey

  const response = await authHttp({
    url: `${url.getLeaderBoard.replace(':sessionId', data.sessionId)}`,
    method: 'GET'
  })

  return response.data
}

export const postLeaderBoard = async (formData: LeaderboardScoreFormData) => {
  const response = await authHttp({
    url: `${url.createLeaderBoard.replace(':eventId', formData.event_id).replace(':sessionId', formData.session_id)}`,
    method: 'POST',
    data: {
      round_id: formData.round_id,
      point: formData.point,
      house_id: formData.house_id
    }
  })

  return response.data
}
