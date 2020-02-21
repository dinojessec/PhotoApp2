/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// components
// import Test from './src/components/test';
import PhotoEditor from './src/components/photo_editor';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <PhotoEditor />;
};

export default App;
