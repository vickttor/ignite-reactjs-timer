import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { LayoutContainer } from './styles'
import { AnimatePresence } from 'framer-motion'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
    </LayoutContainer>
  )
}
