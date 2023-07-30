import { HeaderContainer } from './styles'
import {
  Timer,
  Scroll,
  SpeakerSimpleHigh,
  SpeakerSimpleSlash,
} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import logoIgnite from '../../assets/logo.png'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Header() {
  const { isSoundAllowed, handleTogglePageSound } = useContext(CyclesContext)

  return (
    <HeaderContainer>
      <motion.img
        src={logoIgnite}
        draggable={false}
        whileHover={{
          rotate: [0, 12, 0, -12, 0, 12, 0, -12, 0, 12, 0, -12, 0, 12, 0],
          transition: { duration: 0.3 },
          scale: 1.2,
        }}
      />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          onClick={handleTogglePageSound}
        >
          {isSoundAllowed ? (
            <SpeakerSimpleHigh size={24} />
          ) : (
            <SpeakerSimpleSlash size={24} />
          )}
        </motion.button>
      </nav>
    </HeaderContainer>
  )
}
