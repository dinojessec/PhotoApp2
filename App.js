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
import Icon from 'react-native-vector-icons/FontAwesome';
import Marker, {Position, ImageFormat} from 'react-native-image-marker';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let [image, setImage] = useState({uri: ''});
  let [screen, setScreen] = useState('pickImage-screen');
  let [value, onChangeText] = useState('Useless Placeholder');

  let addTextIcon = require('./src/components/text.png');
  let exitIcon = require('./src/components/exit.png');

  let changeScreen = screenName => {
    setScreen(screenName);
  }


  let _addTextToImage = (input, fontSize) => {
    if (image) {
      Marker.markText({
        src: image,
        text: input,
        position: Position.bottomCenter,
        color: '#FFFFFF',
        // fontName: 'Arial-BoldItalicMT',
        fontName: 'Barabara',
        fontSize: fontSize,
        scale: 1,
        quality: 100,
        saveFormat: ImageFormat.png,
      }).then(path => {
        setImage({
          uri: Platform.OS === 'android' ? 'file://' + path : path
        }).catch(err => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
        });
      });
    }
  };

  if(screen === "pickImage-screen"){
    console.log(screen)
    return (
      <View style={styles.container}>
        <Text style={styles.buttonTextStyling}>Select a Photo</Text>
        <View style={styles.iconsContainer}>
          <PhotoEditor setImage={setImage} photoFrom="camera" buttonTitle="Camera" setScreen={setScreen} screen={screen} />
          <PhotoEditor setImage={setImage} photoFrom="gallery" buttonTitle="Gallery" setScreen={setScreen} screen={screen} />
        </View>  
      </View>
    )
  }

  if(screen === "editImage-screen"){
    console.log(screen)
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.topControls}>
            <TouchableOpacity onPress={() => _addTextToImage("hello", 400)} >
              <Image source={addTextIcon} style={{height: 40, width: 40}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeScreen('pickImage-screen')}>
              <Image source={exitIcon} style={{height: 40, width: 40}} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 3, justifyContent: "center"}}>
          {image.uri ? (
            <Image
              source={{uri: image.uri}}
              resizeMode="contain"
              style={styles.image}
            />
          ) : null}
        </View>

        <View style={{flex: 1}}>
          <Text>HELLO</Text>
        </View>
      </View>
    );
  }

  

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  buttonTextStyling: {
    fontFamily: "Barabara"
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: '20%',
    top: 100
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

})


export default App;
