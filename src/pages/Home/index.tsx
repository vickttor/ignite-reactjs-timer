import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import {
  createNewCycleSchema,
  newCycleType,
} from '../../modules/task/createTask.schema'

import { useContext, useEffect } from 'react'
import useSound from 'use-sound'
import { HandPalm, Play } from 'phosphor-react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { CyclesContext } from '../../contexts/CyclesContext'

import mechKeyboardSound from '../../assets/sound/mech-keyboard.mp3'

// controlled => Persist the user's input into states in real time
// uncontrolled => Conventional way the inputs persist value into it

export function Home() {
  const { isSoundAllowed, activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)
  const [playPressedButtonSound] = useSound(mechKeyboardSound)

  const newCycleForm = useForm<newCycleType>({
    resolver: zodResolver(createNewCycleSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = newCycleForm

  const handleCreateNewCycle = (data: newCycleType) => {
    createNewCycle(data)
  }

  useEffect(() => {
    const { task, minutesAmount } = errors
    if (task) toast.error(String(task.message))
    if (minutesAmount) toast.error(String(minutesAmount.message))
  }, [errors])

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')
  const isSubmitButtonDisabled = !task || !minutesAmount

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ rotate: 0 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={() => {
              if (isSoundAllowed) playPressedButtonSound()
              interruptCurrentCycle()
              reset()
            }}
          >
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            onClick={() => {
              if (isSoundAllowed) playPressedButtonSound()
            }}
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
