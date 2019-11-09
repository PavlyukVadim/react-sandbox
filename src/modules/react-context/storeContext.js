import React from 'react'
import config from './config'

const { themes } = config

export const defaultContextValue = {
  userInfo: {
    name: null,
    email: 'example@com',
  },
  theme: themes.white,
}

export const StoreContext = React.createContext(defaultContextValue)
