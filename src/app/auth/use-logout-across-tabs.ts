import { useCallback, useEffect } from 'react'

export const useLogoutAcrossTabs = (logoutCallback: () => void) => {
  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        logoutCallback()
      }
    }

    window.addEventListener('storage', syncLogout)

    return () => {
      window.removeEventListener('storage', syncLogout)
    }
  }, [logoutCallback])

  return useCallback(() => {
    logoutCallback()
    localStorage.setItem('logout', Date.now().toString())
  }, [logoutCallback])
}
