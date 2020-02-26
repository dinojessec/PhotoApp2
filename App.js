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
  Button,
  TouchableOpacity,
  TextInput,
  Platform,
  Slider,
  Alert,
  Picker,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';

import PhotoEditor from './src/components/photo_editor';
import Icon from 'react-native-vector-icons/FontAwesome';
import Marker, {Position, ImageFormat} from 'react-native-image-marker';
import RangeSlider from 'rn-range-slider';
import CameraRoll from '@react-native-community/cameraroll';

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  let [image, setImage] = useState({uri: ''});
  let [displayImage, setDisplayImage] = useState({uri: ''})
  let [screen, setScreen] = useState('pickImage-screen');
  let [value, onChangeText] = useState('#PH');
  let [fontSize, setFontSize] = useState(40);
  let [pos, setPos] = useState(0);
  let [isLoading, setIsLoading] = useState(false);

  let addTextIcon = require('./src/components/text.png');
  let exitIcon = require('./src/components/close.png');
  let saveIcon = require('./src/components/save.png')
  let downloadIcon = require('./src/components/download.png');

  let changeScreen = screenName => {
    setScreen(screenName);
  }

  if(isLoading) {
    return (
      <View style={[styles.container]}>
        <ActivityIndicator size={100} color="#000000" />
      </View>
    )
  }

  let backHandler = () => {
    Alert.alert(
      'Did you save the image?',
      'You might want to save the image first before closing.',
      [
        {
          text: 'Go back',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Discard image', onPress: () => {
          setImage({uri: ''})
          setDisplayImage({uri: ''})
          setScreen('pickImage-screen')
        }},
      ],
      {cancelable: false},
    );
  }

  let saveHandler = () => {
    Alert.alert(
      'Image saved.',
      'Check your photo gallery and start sharing the fun!',
      [
        {text: 'OK', onPress: () => {}},
      ],
      {cancelable: false},
    );
  }


  let _addTextToImage = (input, fontSize, pos) => {
    pos = pos === '1' ? Position.center: Position.bottomCenter;
    if (image) {
      Marker.markText({
        src: image,
        text: input,
        position: pos,
        color: '#FFFFFF',
        // fontName: 'Arial-BoldItalicMT',
        fontName: 'Barabara',
        fontSize: fontSize,
        scale: 1,
        quality: 100,
        saveFormat: ImageFormat.png,
      }).then(path => {
        setDisplayImage({
          uri: Platform.OS === 'android' ? 'file://' + path : path
        }).catch(err => {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
        });
      });
    }
  };

  // displayImage = original
  // image = changing state

  let imageDisplayer = () => {
    if(displayImage.uri) {
      // display the display image
      console.log("display image")
      return (
        <Image
          source={{uri: displayImage.uri}}
          resizeMode="contain"
          style={styles.image}
        />
      )
    } 
    else {
      console.log("image")
      if (image) {
        // display image
        return(
          <Image
            source={{uri: image.uri}}
            resizeMode="contain"
            style={styles.image}
          />
        )
      }
      else {
        // display none
        return null
      }
    }
  }
  

  let _saveImage = async () => {
    if (image) {
      // console.log(image.uri);
      CameraRoll.saveToCameraRoll(displayImage.uri, 'photo');
      CameraRoll.getPhotos({
        first: 5,
        assetType: 'Photos',
      })
        .then(result => console.log('camera roll result', result))
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
  };

  if(screen === "pickImage-screen"){
    console.log(screen)
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10, alignItems: "center"}}> 
          <Text style={styles.buttonTextStyling}>Select the</Text>
          <Text style={styles.buttonTextStyling}>Photo source</Text>
        </View>
        <View style={styles.iconsContainer}>
          <PhotoEditor setImage={setImage} photoFrom="camera" buttonTitle="Camera" setScreen={setScreen} screen={screen} isLoading={isLoading} setIsLoading={setIsLoading} />
          <PhotoEditor setImage={setImage} photoFrom="gallery" buttonTitle="Gallery" setScreen={setScreen} screen={screen} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </View>  
      </View>
    )
  }

  if(screen === "editImage-screen"){
    return (
      <View style={{flex: 1}}>
      
        <View style={{flex: 1}}>
          <View style={styles.topControls}>
            <TouchableOpacity onPress={() =>{ 
              _saveImage();
              saveHandler();
            }} >
              <Image source={saveIcon} style={{height: 40, width: 40, paddingHorizontal: 20 }} />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => _addTextToImage(value, fontSize, pos)} >
              <Image source={addTextIcon} style={{height: 40, width: 40}} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={backHandler}>
              <Image source={exitIcon} style={{height: 40, width: 40}} />
            </TouchableOpacity>
          </View>
        </View>

        <KeyboardAvoidingView style={{flex: 10, justifyContent: "center"}} behavior="padding" enabled keyboardVerticalOffset={30}> 
          {imageDisplayer()}
        </KeyboardAvoidingView>

        <View style={{flex: 5, alignItems: "center"}}>
          <View style={{width: '80%', height: 40, flexDirection: "row", alignItems: "center", marginBottom: 10}}>
            <Text style={{width: '20%',fontFamily: "Barabara",  fontSize: 12}} >Text </Text>
            <TextInput 
              style={{width: '80%', height: 40 , borderColor: 'gray', borderWidth: 1, borderRadius: 10, paddingHorizontal: 10}}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
          </View>
          
          <View style={{width: '80%', height: 40, flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
            <Text style={{width: '20%',fontFamily: "Barabara",  fontSize: 12}}>size </Text>
            <Slider
              style={{width: '80%'}}
              minimumValue={90}
              maximumValue={400}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#000000"
              value={fontSize}
              onValueChange={(fontSize)=> {
                // console.log(Math.floor(fontSize))
                setFontSize(Math.floor(fontSize))
              }}
            />
          </View>

          <View style={{width: '80%', height: 40, flexDirection: "row", alignItems: "center", marginBottom: 10  }}>
            <Text style={{width: '25%', fontFamily: "Barabara", fontSize: 12}}>Position </Text>
            
            <Picker
              style={{width: '40%', height: 40}}
              selectedValue={pos}
              onValueChange={(itemValue) =>{
                // console.log("============ value", itemValue)
                // console.log("============ pos state", pos)
                setPos(itemValue)
              }}>
              <Picker.Item label="Bottom" value="0" />
              <Picker.Item label="Center" value="1" />
            </Picker>
          </View>

          <TouchableOpacity onPress={() => _addTextToImage(value, fontSize, pos) } activeOpacity = { .5 } style={styles.buttonStyle}>
            <Text style={{color: "white", fontWeight: "bolder", fontFamily: "Barabara"}}>APPLY</Text>
          </TouchableOpacity>
          

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
    fontFamily: "Barabara",
    fontSize: 24,
    marginBottom: 10
  },
  topControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: '10%',
    top: 40
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonStyle: {
    marginTop:10,
    padding: 10,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#000000',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '80%',
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    
  },

})


export default App;
