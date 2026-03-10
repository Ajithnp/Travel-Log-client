export type ScheduleFormValues = {
  startDate:         string
  endDate:           string
  reportingTime:     string
  reportingLocation: string
  pricing: {
    solo:  number
    duo:   number
    group: number
  }
  totalSeats: number
  notes?:     string
}