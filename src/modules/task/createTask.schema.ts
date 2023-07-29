import * as zod from 'zod'

export const createNewCycleSchema = zod.object({
  task: zod.string().min(5),
  minutesAmount: zod.number().min(1).max(60),
})

export type newCycleType = zod.infer<typeof createNewCycleSchema>
