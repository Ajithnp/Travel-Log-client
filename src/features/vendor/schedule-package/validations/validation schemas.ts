import { z } from 'zod'

export const MIN_TRIP_DAYS    = 7
export const MAX_NOTES_LENGTH = 500
export const MAX_PRICE        = 500000 
export const MAX_SEATS        = 500


const toDateOnly = (dateStr: string) => {
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return d
}

const tomorrow = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 1)
  return d
}

export const diffInDays = (from: string, to: string) =>
  Math.round(
    (toDateOnly(to).getTime() - toDateOnly(from).getTime()) / (1000 * 60 * 60 * 24)
  )


const requiredPrice = (label: string) =>
  z
    .number({ invalid_type_error: `${label} price is required` })
    .positive(`${label} price must be greater than ₹0`)
    .max(MAX_PRICE, `${label} price seems too high. Please double-check.`)

const optionalPrice = (label: string) =>
  z
    .number({ invalid_type_error: `${label} must be a number` })
    .positive(`${label} price must be greater than ₹0`)
    .max(MAX_PRICE, `${label} price seems too high. Please double-check.`)
    .optional()

export const scheduleFormSchema = z
  .object({

    startDate: z
      .string({ required_error: 'Start date is required' })
      .min(1, 'Start date is required')
      .refine(
        (val) => toDateOnly(val) >= tomorrow(),
        'Start date must be at least 1 day in the future'
      )
    .refine(
    (val) => {
      if (!val) return true
      const minStart = new Date()
      minStart.setHours(0, 0, 0, 0)
      minStart.setDate(minStart.getDate() + MIN_TRIP_DAYS)  
      return toDateOnly(val) >= minStart
    },
    `Schedule must be created at least ${MIN_TRIP_DAYS} days in advance for better organization`
  ),

    endDate: z
      .string({ required_error: 'End date is required' })
      .min(1, 'End date is required'),
  
    reportingTime: z
      .string({ required_error: 'Reporting time is required' })
      .min(1, 'Reporting time is required')
      .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Enter a valid time (HH:MM)'),

    reportingLocation: z
      .string({ required_error: 'Reporting location is required' })
      .trim()
      .min(5,   'Location must be at least 5 characters')
      .max(300, 'Location must be under 300 characters'),

    pricing: z.object({
      solo:  requiredPrice('Solo'),   
      duo:   optionalPrice('Duo'),    
      group: optionalPrice('Group'),  
    }),

    totalSeats: z
      .number({ invalid_type_error: 'Total seats is required' })
      .int('Seats must be a whole number')
      .min(1,         'Total seats must be at least 1')
      .max(MAX_SEATS, `Total seats cannot exceed ${MAX_SEATS}`),

    notes: z
      .string()
      .max(MAX_NOTES_LENGTH, `Notes must be under ${MAX_NOTES_LENGTH} characters`)
      .optional()
      .transform((val) => val?.trim() || undefined),
  })


  // Rule 1: endDate must be after startDate
  .refine(
    ({ startDate, endDate }) =>
      !startDate || !endDate || toDateOnly(endDate) > toDateOnly(startDate),
    { message: 'End date must be after start date', path: ['endDate'] }
  )

  .refine(
    ({ pricing }) => !pricing.duo || pricing.duo <= pricing.solo * 2,
    { message: 'Duo price should not exceed 2× the solo price', path: ['pricing', 'duo'] }
  )

  .refine(
    ({ pricing }) => !pricing.group || pricing.group <= pricing.solo * 4,
    { message: 'Group price should not exceed 4× the solo price', path: ['pricing', 'group'] }
  )

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>