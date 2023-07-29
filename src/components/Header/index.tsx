import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoIgnite from '../../assets/logo.png'

import { motion } from 'framer-motion'

export function Header() {
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
      </nav>
    </HeaderContainer>
  )
}
