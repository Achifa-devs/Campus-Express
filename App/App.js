import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import NavigationHandler from './src/navigation/Index'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      
        <Provider store={store}>
          <NavigationHandler />
        </Provider>
  
      </SafeAreaView>
    </>
  )
}
