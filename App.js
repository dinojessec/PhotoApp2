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
import AddTextToImage from './src/components/AddTextToImage';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let [watermarkedImage, setWatermarkedImage] = useState({uri: ''});
  let [finalImage, setFinalImage] = useState({uri: ''});
  console.log('==========watermarked', watermarkedImage);
  console.log('==========final', finalImage);
  return (
    <View>
      <PhotoEditor setWatermarkedImage={setWatermarkedImage} />
      <AddTextToImage
        watermarkedImage={watermarkedImage}
        setFinalImage={setFinalImage}
      />
      <View style={{flex: 1, flexDirection: 'row'}}>
        {finalImage.uri ? (
          <Image
            source={{uri: finalImage.uri}}
            resizeMode="contain"
            style={{aspectRatio: 1, width: '100%'}}
          />
        ) : watermarkedImage.uri ? (
          <Image
            source={{uri: watermarkedImage.uri}}
            resizeMode="contain"
            style={{aspectRatio: 1, width: '100%'}}
          />
        ) : null}
        <Text>====================================</Text>
      </View>
    </View>
  );
};

export default App;
