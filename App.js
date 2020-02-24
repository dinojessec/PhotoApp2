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

  // let [capturedImage, setCapturedImage] = useState({
  //   uri: '',
  // });

  // RNFS.readDir(RNFS.MainBundlePath)
  //   .then(result => {
  //     console.log('GOT RESULT', result);
  //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  //   })
  //   .then(statResult => {
  //     if (statResult[0].isFile()) {
  //       return RNFS.readFile(statResult[1], 'utf8');
  //     }
  //     return 'no file';
  //   })
  //   .then(contents => {
  //     console.log(contents);
  //   })
  //   .catch(err => {
  //     console.log(err.message, err.code);
  //   });
  return (
    <View>
      {/* <Camera setCapturedImage={setCapturedImage} /> */}
      {finalImage ? null : (
        <PhotoEditor finalImage={finalImage} setFinalImage={setFinalImage} />
      )}
      <View style={{flex: 1, flexDirection: 'row'}}>
        {finalImage.uri ? (
          <Image
            source={{uri: finalImage.uri}}
            resizeMode="contain"
            style={{height: 100, width: 100}}
          />
        ) : null}
        <Text>====================================</Text>
      </View>
    </View>
  );
};

export default App;
