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
import AppHeader from './components/AppHeader';
import TaskContainer from './containers/TaskContainer';
import Input
 from './components/Input';
const App = () => {
  return (
    <SafeAreaView  style={styles.container}>
        <AppHeader />
        <TaskContainer />
        <Input />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
export default App;
