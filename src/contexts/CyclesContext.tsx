import { differenceInSeconds } from 'date-fns'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { Cycle, CyclesState, cyclesReducer } from '../reducers/cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

export interface CyclesContextType {
  isSoundAllowed: boolean
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number

  markCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (cycle: CreateCycleData) => void
  interruptCurrentCycle: () => void
  handleTogglePageSound: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [isSoundAllowed, setIsSoundAllowed] = useState(true)
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    } as CyclesState,
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  useEffect(() => {
    const isAllowed = localStorage.getItem('@ignite-timer:sound-1.0.0')
    if (isAllowed) setIsSoundAllowed(isAllowed.toLowerCase() === 'allowed')
  }, [])

  const setSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const markCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  const handleTogglePageSound = useCallback(() => {
    const isAllowed = !isSoundAllowed ? 'allowed' : 'not-allowed'
    localStorage.setItem('@ignite-timer:sound-1.0.0', isAllowed)

    setIsSoundAllowed((prevState) => !prevState)
  }, [isSoundAllowed])

  const createNewCycle = (data: CreateCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        isSoundAllowed,
        handleTogglePageSound,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
