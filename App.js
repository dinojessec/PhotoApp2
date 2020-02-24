/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
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
import RNFS from "react-native-fs";
// import Ionicons from 'react-native-ionicons'
import Icon from 'react-native-vector-icons/FontAwesome';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // logging required things
  const util = require('util')
  console.log(util.inspect(RNFS, false, null, true /* enable colors */))

  const [input, setInput] = useState('sample');

  const [screen, setScreen] = useState('home-screen');


  
  if(screen === 'secret-screen'){
    return (
      <View style={styles.container}>

        <View style={styles.topControlsContainer}>
          <TouchableOpacity style={styles.icon}><Icon name="flash" size={40} color="black" /></TouchableOpacity>
          <TouchableOpacity style={styles.icon}><Icon name="times-circle-o" size={40} color="black" /></TouchableOpacity>
        </View>

        <View style={styles.cameraContainer}>
          <TextInput
            style={{
              width: '100%',
              height: 50,
              borderColor: 'black',
              borderWidth: 1,
            }}
            onChangeText={input => setInput(input)}
            value={input}
          />
        </View>

        <PhotoEditor myimg="sample.jpg" mycaption={input} />

        <View style={styles.footerControlsContainer}>
          <TouchableOpacity style={styles.icon}><Icon name="image" size={40} color="black" /></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('edit-screen')} style={styles.icon}><Icon name="circle-thin" size={100} color="black" /></TouchableOpacity>
          <TouchableOpacity style={styles.icon}><Icon name="repeat" size={40} color="black" /></TouchableOpacity>
        </View>
      </View>
    );
  }
  
  if(screen === 'home-screen'){
    return (
      <View style={styles.container}>
        <PhotoEditor myimg="sample.jpg" mycaption={input} setScreen={setScreen}/>
        
      </View>
    );
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center"
  },
  topControlsContainer: {
    height: '15%',
    backgroundColor: 'white',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  footerControlsContainer: {
    height: "15%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    alignSelf: "center"
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'green'
  }
});

export default App;
