/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import store from './redux/store'
import { Provider } from 'react-redux'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import AppContent from './src/Index'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <StatusBar 
        backgroundColor="#FFA500" 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
      />

      <Provider store={store}>
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
