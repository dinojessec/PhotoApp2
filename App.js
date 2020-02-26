/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import RNFS from 'react-native-fs';
import ImagePicker from 'react-native-image-picker';
import CameraRoll from '@react-native-community/cameraroll';

import PhotoEditor from './src/components/photo_editor';
import AddTextToImage from './src/components/AddTextToImage';

const APP_FOLDER_NAME = 'DOTPhotoApp';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let [image, setImage] = useState({uri: ''});

  _saveImage = async () => {
    if (image) {
      console.log(image.uri);
      CameraRoll.saveToCameraRoll(image.uri, 'photo');
      CameraRoll.getPhotos({
        first: 5,
        assetType: 'Photos',
      })
        .then(result => console.table('camera roll result', result))
        .catch(err => {
          console.log(err);
          throw err;
        });
      // const albumPath = `${RNFS.PicturesDirectoryPath}/${APP_FOLDER_NAME}`;
      // console.log('album path', albumPath);
      // const fileName = new Date().getTime();
      // console.log('filename', fileName);
      // RNFS.moveFile(image.uri, `${albumPath}/${fileName}`).then(() =>
      //   RNFS.scanFile(`file://${albumPath}/${fileName}`),
      // );
    }
  };

  return (
    <View>
      <PhotoEditor setImage={setImage} />
      <AddTextToImage image={image} setImage={setImage} />

      <TouchableOpacity onPress={() => _saveImage()} style={styles.pickImage}>
        <Image style={{height: 27, width: 27, margin: 5}} />
        <Text> Save Image </Text>
      </TouchableOpacity>

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
  pickImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c5c',
  },
});

export default App;
