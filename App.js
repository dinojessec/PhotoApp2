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

import PhotoEditor from './src/components/photo_editor';
import AddTextToImage from './src/components/AddTextToImage';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // let [watermarkedImage, setWatermarkedImage] = useState({uri: ''});
  // let [finalImage, setFinalImage] = useState({uri: ''});

  let [image, setImage] = useState({uri: ''});

  return (
    <View>
      <PhotoEditor setImage={setImage} />
      <AddTextToImage image={image} setImage={setImage} />

      <View style={{flex: 1, flexDirection: 'row'}}>
        {image.uri ? (
          <Image
            source={{uri: image.uri}}
            resizeMode="contain"
            style={styles.image}
          />
        ) : null}
        {/* {finalImage.uri ? (
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
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    width: '100%',
  },
});

export default App;
