export const url = {
  getEvents: '/events',
  postEvent: '/event',
  getEventById: '/event/:eventId',
  postHouse: '/house',
  postParticipant: '/participant',

  login: '/auth/login',
  changePassword: '/auth/change-password',
  refresh: '/auth/refresh',
  me: '/auth/me',
  form: '/form',
  formSearch: '/form/search',
  formById: '/form/:formId',
  link: '/link',
  tokenLink: '/link/:tokenLink/form',
  patientInfo: '/patient/info',
  patientInfoSearch: '/patient/search',
  patientInfoById: '/patient/info/:patientId',
  downloadPatientInfoById: '/patient/info/download/:patientId',
  treatmentData: '/treatmentData',
  treatmentFormById: '/treatmentForm/:treatmentFormId',
  downloadtreatmentForm: '/treatmentForm/download/:treatmentFormId',

  treatmentForm: '/treatmentForm'
}
export default url
