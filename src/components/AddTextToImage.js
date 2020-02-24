import React, {useState} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  TextInput,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Marker, {Position, ImageFormat} from 'react-native-image-marker';
import Picker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const icon = require('./icon.jpeg');
// const iconTP = require('./tpimage.png')
const bg = require('./bg.png');
const base64Bg = require('./bas64bg.js').default;

function AddTextToImage(props) {
  let {watermarkedImage, setFinalImage} = props;
  console.log('======', watermarkedImage);
  let [details, setDetails] = useState({
    uri: '',
    image: bg,
    marker: icon,
    markImage: true,
    base64: false,
    useTextShadow: true,
    useTextBgStyle: true,
    textBgStretch: 0,
    saveFormat: ImageFormat.png,
    loading: false,
  });

  let [value, onChangeText] = useState('Useless Placeholder');

  _addTextToImage = input => {
    Marker.markText({
      src: watermarkedImage,
      text: value,
      position: Position.bottomCenter,
      color: '#FFFFFF',
      // fontName: 'Arial-BoldItalicMT',
      fontName: 'Barabara',
      fontSize: 44,
      scale: 1,
      quality: 100,
      saveFormat: details.saveFormat,
    }).then(path => {
      setFinalImage({
        uri:
          details.saveFormat === ImageFormat.base64
            ? path
            : Platform.OS === 'android'
            ? 'file://' + path
            : path,
      }).catch(err => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });
    });
  };
  return (
    <>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity
        onPress={() => _addTextToImage(value)}
        style={styles.pickImage}>
        <Image style={{height: 27, width: 27, margin: 5}} />
        <Text> Add Text </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  pickImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c5c',
  },
});

export default AddTextToImage;
