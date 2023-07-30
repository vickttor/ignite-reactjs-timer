import { useEffect, useContext } from 'react'
import useSound from 'use-sound'
import { motion } from 'framer-motion'
import { differenceInSeconds } from 'date-fns'
import { CountdownContainer, Separator } from './style'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { Notifyer } from '../../../../utils/notifier'

import timerLogo from '../../../../assets/logo.png'
import alarmClockSound from '../../../../assets/sound/alarm-clock.mp3'

export function Countdown() {
  const {
    isSoundAllowed,
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const [playAlarmClockSound] = useSound(alarmClockSound)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    Notifyer.init() // request user permission
  }, [])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro'
    }
  }, [activeCycle, minutes, seconds])

  useEffect(() => {
    let interval: any

    function alertTimeFinished() {
      if (isSoundAllowed) playAlarmClockSound()

      const showNotification = Notifyer.notify({
        title: 'Time finished',
        body: String(activeCycle?.task),
        icon: timerLogo,
      })

      showNotification()
    }

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinished()

          setSecondsPassed(totalSeconds)
          clearInterval(interval)

          alertTimeFinished()
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    isSoundAllowed,
    totalSeconds,
    activeCycle,
    activeCycleId,
    markCycleAsFinished,
    setSecondsPassed,
    playAlarmClockSound,
  ])

  return (
    <CountdownContainer>
      <motion.span drag="y" dragConstraints={{ top: 1, bottom: 1 }}>
        {minutes[0]}
      </motion.span>
      <motion.span drag="y" dragConstraints={{ top: 1, bottom: 1 }}>
        {minutes[1]}
      </motion.span>
      <Separator>:</Separator>
      <motion.span drag="y" dragConstraints={{ top: 1, bottom: 1 }}>
        {seconds[0]}
      </motion.span>
      <motion.span drag="y" dragConstraints={{ top: 1, bottom: 1 }}>
        {seconds[1]}
      </motion.span>
    </CountdownContainer>
  )
}
