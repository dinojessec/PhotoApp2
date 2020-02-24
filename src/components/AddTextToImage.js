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

const icon = require('./icon.jpeg');
const bg = require('./bg.png');
const base64Bg = require('./bas64bg.js').default;

function AddTextToImage(props) {
  // let {watermarkedImage, setFinalImage} = props;
  let {image, setImage} = props;
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
    if (image) {
      Marker.markText({
        src: image,
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
        setImage({
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
    }
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
