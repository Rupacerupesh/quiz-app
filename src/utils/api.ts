import { authHttp } from './http'

import { url } from './url'

export type Events = {
  id: string
  name: string
  description: string
  event_date: string
  status: boolean
}

export type EventsById = {
  event: Events
  houses: HouseType[]
}

export interface HouseType {
  house_id: string
  house_name: string
  color_code: string
  participants?: Participants[]
  event_id: string
}
export interface Participants {
  name: string
  grade: string
  is_captain: boolean
  house_id: string
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

export const postParticipant = async (formData: Participants) => {
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
