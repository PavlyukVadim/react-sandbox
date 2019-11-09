import React, { useReducer, useCallback }  from 'react'
import config from './config'
import { defaultContextValue, StoreContext } from './storeContext'

const { themes } = config

const THEME_UPDATE = 'THEME_UPDATE'
const USER_UPDATE = 'USER_UPDATE'

const reducer = (state, action) => {
  switch (action.type) {
    case THEME_UPDATE: return { ...state, theme: themes[action.theme] }
    case USER_UPDATE: return { ...state, userInfo: action.userInfo }
    default: throw new Error()
  }
}

const ContextProvider = ({children}) => {
  const [storeValue, dispatch] = useReducer(reducer, defaultContextValue)

  const toggleTheme = useCallback(
    () => {
      const newTheme = storeValue.theme === themes.white ? 'dark' : 'white'
      dispatch({ type: THEME_UPDATE, theme: newTheme })
    },
    [dispatch, storeValue],
  )

  const updateUserInfo = useCallback(
    (userInfo) => {
      dispatch({ type: USER_UPDATE, userInfo })
    },
    [dispatch],
  )

  const contextValue = {
    storeValue,
    toggleTheme,
    updateUserInfo,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  )
}

export default ContextProvider
