import { Outlet } from 'react-router-dom'
import AppHeader from './components/layout/app.header'
import { useEffect } from 'react'
import { fetchAccountAPI } from './services/api'
import { useCurrentApp } from './components/context/app.context'
import PacmanLoader from 'react-spinners/PacmanLoader'

function Layout() {

  const { setUser, isAppLoading, setIsAppLoading, setIsAuthenticated } = useCurrentApp();

  useEffect(() => {
    const fetchAccount = async () => {
      const res = await fetchAccountAPI();
      if (res.data) {
        setUser(res.data.user);
        setIsAuthenticated(true);
      }
      setIsAppLoading(false);

    }
    fetchAccount();
  }, [])

  return (
    <>
      {isAppLoading === false ?
        <div>
          <AppHeader />
          <Outlet />
        </div>
        :
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <PacmanLoader
            size={50}
          />
        </div>
      }
    </>
  )
}

export default Layout
