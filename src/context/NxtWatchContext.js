import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkThemeEnabled: false,
  activeTabId: 'Home',
  savedVideos: [],
  addToSavedVideos: () => {},
  toggleTheme: () => {},
  updateActiveTabId: () => {},
})

export default NxtWatchContext
