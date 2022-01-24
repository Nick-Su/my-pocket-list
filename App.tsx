import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AppHeader from './src/components/AppHeader';
import TaskContainer from './src/containers/TaskContainer';
import Input from './src/components/Input';

import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView  style={styles.container}>
          <AppHeader />
          <TaskContainer />
          <Input />
      </SafeAreaView>
    </PaperProvider>
  );
};

// AppRegistry.registerComponent(appName, () => Main);


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
export default App;
