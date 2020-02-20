/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {RNPhotoEditor} from 'react-native-photo-editor';
import RNFS from 'react-native-fs';

const App: () => React$Node = () => {
  _onPress = () => {
    RNPhotoEditor.Edit({
      path: RNFS.DocumentDirectoryPath + '/photo.jpg',
      stickers: [
        'sticker0',
        'sticker1',
        'sticker2',
        'sticker3',
        'sticker4',
        'sticker5',
        'sticker6',
        'sticker7',
        'sticker8',
        'sticker9',
        'sticker10',
      ],
      // hiddenControls: [
      //   'clear',
      //   'crop',
      //   'draw',
      //   'save',
      //   'share',
      //   'sticker',
      //   'text',
      // ],
      colors: undefined,
      onDone: () => {
        console.log('on done');
      },
      onCancel: () => {
        console.log('on cancel');
      },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this._onPress}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
