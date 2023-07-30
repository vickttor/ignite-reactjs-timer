import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutesAmountInput, TaskInput } from './style'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;m going to work in</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        type="text"
        placeholder="Give a name for your project"
        autoComplete="off"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Study English"></option>
        <option value="Study Algorithm and Data Structure"></option>
        <option value="Study NodeJS"></option>
        <option value="Study UI/UX Design"></option>
      </datalist>

      <div className="minutesAmount">
        <label htmlFor="minutesAmount">for</label>
        <MinutesAmountInput
          id="minutesAmount"
          type="number"
          placeholder="00"
          max={60}
          disabled={!!activeCycle}
          {...register('minutesAmount', {
            valueAsNumber: true,
          })}
        />

        <span>minutes.</span>
      </div>
    </FormContainer>
  )
}
