import { store } from '../slicer/store'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/lib/persistStore'
import { ThemeProvider } from 'next-themes'
import { MantineProvider } from '@mantine/core'

export const AppProviders = ({ children }: any) => {
  let persistor = persistStore(store)
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <MantineProvider
          theme={{ fontFamily: 'Open Sans' }}
          withGlobalStyles
          withNormalizeCSS
        >
          {children}
        </MantineProvider>
      </ThemeProvider>
    </Provider>
  )
}
