import React, { useContext, useState, useMemo, useRef } from 'react'
import { StoreContext } from './storeContext'
import ContextProvider from './contextProvider'
import config from './config'
import './styles.css'

const { userFormFields } = config

const Header = () => {
  const { storeValue: { userInfo } } = useContext(StoreContext)
  return <MemoHeader userInfo={userInfo} />
}

const MemoHeader = React.memo(({userInfo}) => {
  const userInfoStr = JSON.stringify(userInfo, null, 2)
  console.log('MemoHeader: renders')
  return (
    <header className="App-header">
      <p>Current user info: {userInfoStr}</p>
    </header>
  )
})

const UserInfo = () => {
  const { storeValue: { userInfo }, updateUserInfo } = useContext(StoreContext)
  return <MemoUserInfo userInfo={userInfo} updateUserInfo={updateUserInfo} />
}

const MemoUserInfo = React.memo(({userInfo, updateUserInfo}) => {
  const [ localUserInfo, updateLocalUserInfo ] = useState(userInfo)

  const onChange = (fieldName, value) => {
    updateLocalUserInfo({ ...localUserInfo, [fieldName]: value })
  }

  const onUpdateUserInfo = () => updateUserInfo(localUserInfo)

  const inputs = userFormFields.map((field) => {
    const { name } = field
    const value = localUserInfo[name]
    return (
      <input
        key={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        {...field}
      />
    )
  })

  console.log('MemoUserInfo: renders')
  return (
    <div>
      <form className="UserInfo-form">
        {inputs}
      </form>
      <button onClick={onUpdateUserInfo}>
        Update user info
      </button>
    </div>
  )
})

const ThemeToggleButton = () => {
  const { storeValue: { theme }, toggleTheme } = useContext(StoreContext)

  return (
    <button
      onClick={toggleTheme}
      style={theme}
    >
      Switch theme
    </button>
  )
}

const App = () => {
  return (
    <div className="App">
      <ContextProvider>
        <Header />
        <UserInfo />
        <ThemeToggleButton />
      </ContextProvider>
    </div>
  )
}

export default App
