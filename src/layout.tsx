import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet } from 'react-router-dom'
import AppHeader from './components/layout/app.header'

function Layout() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default Layout
