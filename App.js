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
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Camera from './src/components/camera';
import RNFS from 'react-native-fs';
import PhotoEditor from './src/components/photo_editor';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let [finalImage, setFinalImage] = useState({uri: ''});
  let [screen, setScreen] = useState('pickImage-screen');

  if(screen === 'pickImage-screen') {
    return (
      <View style={styles.container}>
  
        <PhotoEditor finalImage={finalImage} setFinalImage={setFinalImage} setScreen={setScreen} screen={screen} />
  
        
      </View>
    );
  }
  if(screen === 'editImage-screen') {
    return (
      <View style={styles.container}>
        {finalImage.uri ? (
          <Image
            source={{uri: finalImage.uri}}
            resizeMode="contain"
            style={styles.imageContainer}
          />
        ) : null}
        <Text>====================================</Text>
      </View>
    );
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: "center"
  }
})

export default App;
