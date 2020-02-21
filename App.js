/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
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

  // logging required things
  const util = require('util')
  // console.log(util.inspect(PhotoEditor, false, null, true /* enable colors */))

  const [input, setInput] = useState("sample");


  return (
    <View style={styles.container}>
      <Text>Sample </Text>
      <TextInput style={{ width: '100%', height: 50, borderColor: 'black', borderWidth: 1 }} onChangeText={input => setInput(input)} value={input} />
      <PhotoEditor myimg="sample.jpg" mycaption={input} />
    </View>    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default App;
