import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Marker, {Position, ImageFormat} from 'react-native-image-marker';
import Picker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';


const icon = require('./left.png');
const icon2 = require('./right.png');
// const iconTP = require('./tpimage.png')
const bg = require('./bg.png');
const base64Bg = require('./bas64bg.js').default;

function PhotoEditor(props) {
  let {setImage, setScreen, setIsLoading, isLoading } = props;
  let [details, setDetails] = useState({
    uri: '',
    image: bg,
    marker: icon,
    marker2: icon2,
    markImage: true,
    base64: false,
    useTextShadow: true,
    useTextBgStyle: true,
    textBgStretch: 0,
    saveFormat: ImageFormat.png,
    loading: false,
  });

  _switch = () => {
    setDetails({markImage: !details.markImage});
  };

  _switchBase64Res = () => {
    setDetails({
      saveFormat:
        details.saveFormat === ImageFormat.base64
          ? Image.png
          : ImageFormat.base64,
    });
  };

  _pickImageCamera = type => {
    let options = {
      title: 'title',
      takePhotoButtonTitle: 'camera',
      // chooseFromLibraryButtonTitle: 'gallery',
      cancelButtonTitle: 'cancel',
      quality: 0.5,
      mediaType: 'photo',
      maxWidth: 2000,
      noData: true,
      maxHeight: 2000,
      dateFormat: 'yyyy-MM-dd HH:mm:ss',
      storageOptions: {
        skipBackup: true,
        path: 'imagePickerCache',
      },
      allowsEditing: true,
    };
    Picker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        // this.showCamera();
      } else {
        // You can display the image using either:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const uri = response.uri;
        if (type === 'image') {
          console.log('is loading..')
          // isloading true
          // Display loading screen
          setIsLoading(true);

          Marker.markImage({
            src: uri,
            markerSrc: details.marker,
            position: Position.topLeft,
            scale: 2,
            markerScale: 2,
            quality: 100,
            saveFormat: details.saveFormat,
            
          })
            .then(path => {
              let pathpath = details.saveFormat === ImageFormat.base64
              ? path
              : Platform.OS === 'android'
              ? 'file://' + path
              : path
              Marker.markImage({
                src: pathpath,
                markerSrc: details.marker2,
                position: Position.topRight,
                scale: 1,
                markerScale: 1,
                quality: 100,
                saveFormat: details.saveFormat,
              })
                .then(path => {
                  setImage({
                    uri:
                      details.saveFormat === ImageFormat.base64
                        ? path
                        : Platform.OS === 'android'
                        ? 'file://' + path
                        : path,
                  });
                  setScreen('editImage-screen')
                  // set loading false
                  setIsLoading(false)
                })
                .catch(err => {
                  console.log('====================================');
                  console.log(err, 'err');
                  console.log('====================================');
                });
              
            })
            .catch(err => {
              console.log('====================================');
              console.log(err, 'err');
              console.log('====================================');
            });

         
        } else {
          console.log('show marker');
        }
      }
    });
  };

  _pickImageGallery = type => {
    let options = {
      title: 'title',
      takePhotoButtonTitle: 'camera',
      // chooseFromLibraryButtonTitle: 'gallery',
      cancelButtonTitle: 'cancel',
      quality: 0.5,
      mediaType: 'photo',
      maxWidth: 2000,
      noData: true,
      maxHeight: 2000,
      dateFormat: 'yyyy-MM-dd HH:mm:ss',
      storageOptions: {
        skipBackup: true,
        path: 'imagePickerCache',
      },
      allowsEditing: true,
    };
    Picker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      } else if (response.customButton) {
        // this.showCamera();
      } else {
        // You can display the image using either:
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        const uri = response.uri;
        if (type === 'image') {
          // display loading screen
          setIsLoading(true)
          Marker.markImage({
            src: uri,
            markerSrc: details.marker,
            position: Position.topLeft,
            scale: 1,
            markerScale: 1,
            quality: 100,
            saveFormat: details.saveFormat,
          })
            .then(path => {
              setImage({
                uri:
                  details.saveFormat === ImageFormat.base64
                    ? path
                    : Platform.OS === 'android'
                    ? 'file://' + path
                    : path,
              });
              setScreen('editImage-screen')
              setIsLoading(false)
            })
            .catch(err => {
              console.log('====================================');
              console.log(err, 'err');
              console.log('====================================');
            });
        } else {
          console.log('show marker');
        }
      }
    });
  };
  
 
 
  if(props.photoFrom === "camera"){
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => _pickImageCamera('image')}
          style={styles.buttonGroup}
            
          >
          <Icon name="camera" size={50} color="black" />
          <Text> {props.buttonTitle} </Text>
        </TouchableOpacity>
      </View>
    );
  }
  if(props.photoFrom === "gallery"){
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => _pickImageGallery('image')}
          style={styles.buttonGroup}  
        >
          <Icon name="image" size={50} color="black" />
          <Text> {props.buttonTitle} </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    justifyContent: "space-between",
    padding: 20
  },
  buttonGroup: {
    alignItems: "center"
  },
  pickImageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5c5c',
  },
});

export default PhotoEditor;

// export default class MarkerTest extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       uri: '',
//       image: bg,
//       marker: icon,
//       markImage: true,
//       base64: false,
//       useTextShadow: true,
//       useTextBgStyle: true,
//       textBgStretch: 0,
//       saveFormat: ImageFormat.png,
//       loading: false,
//     };
//   }

//   _switch = () => {
//     this.setState({
//       markImage: !this.state.markImage,
//     });
//   };

//   _switchBg = () => {
//     this.setState(
//       {
//         base64: !this.state.base64,
//       },
//       () => {
//         this.setState({
//           image: this.state.base64 ? base64Bg : bg,
//         });
//       },
//     );
//   };

//   _switchBase64Res = () => {
//     this.setState({
//       saveFormat:
//         this.state.saveFormat === ImageFormat.base64
//           ? ImageFormat.png
//           : ImageFormat.base64,
//     });
//   };

//   render() {
//     console.log(this.state);

//     return (
//       <View style={{flex: 1}}>
//         <ScrollView style={s.container}>
//           <View>
//             <TouchableOpacity
//               style={[s.btn, {backgroundColor: '#FF7043'}]}
//               onPress={this._switchBg}>
//               <Text style={s.text}>
//                 {' '}
//                 use {this.state.base64 ? 'base64' : 'image'} as background
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <TouchableOpacity
//               style={[s.btn, {backgroundColor: '#FF7043'}]}
//               onPress={this._switch}>
//               <Text style={s.text}>
//                 switch to mark {this.state.markImage ? 'text' : 'image'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <TouchableOpacity
//               style={[s.btn, {backgroundColor: '#FF7043'}]}
//               onPress={this._switchBase64Res}>
//               <Text style={s.text}>
//                 export{' '}
//                 {this.state.saveFormat === ImageFormat.base64
//                   ? 'base64'
//                   : 'png'}{' '}
//                 result
//               </Text>
//             </TouchableOpacity>
//           </View>
//           <View>
//             <TouchableOpacity
//               style={[s.btn, {backgroundColor: '#2296F3'}]}
//               onPress={() => this._pickImage('image')}>
//               <Text style={s.text}>pick image</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[s.btn, {backgroundColor: '#2296F3'}]}
//               onPress={() => this._pickImage('mark')}>
//               <Text style={s.text}>pick an image for mark</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={s.op}>
//             <TouchableOpacity style={s.btn} onPress={this._mark}>
//               <Text style={s.text}>mark</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.topLeft)}>
//               <Text style={s.text}>TopLeft</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.topCenter)}>
//               <Text style={s.text}>topCenter</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.topRight)}>
//               <Text style={s.text}>topRight</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.center)}>
//               <Text style={s.text}>Center</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.bottomLeft)}>
//               <Text style={s.text}>bottomLeft</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.bottomCenter)}>
//               <Text style={s.text}>bottomCenter</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={s.btn}
//               onPress={() => this._markByPosition(Position.bottomRight)}>
//               <Text style={s.text}>bottomRight</Text>
//             </TouchableOpacity>
//           </View>
//           {!this.state.markImage ? (
//             <View style={s.op}>
//               <TouchableOpacity
//                 style={s.btnOp}
//                 onPress={() => {
//                   this.setState({
//                     useTextShadow: !this.state.useTextShadow,
//                   });
//                 }}>
//                 <Text style={s.text}>
//                   textShadow {this.state.useTextShadow ? 'on' : 'off'}{' '}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={s.btnOp}
//                 onPress={() => {
//                   this.setState({
//                     useTextBgStyle: !this.state.useTextBgStyle,
//                   });
//                 }}>
//                 <Text style={s.text}>
//                   textBg {this.state.useTextBgStyle ? 'on' : 'off'}{' '}
//                 </Text>
//               </TouchableOpacity>
//               {this.state.useTextBgStyle ? (
//                 <TouchableOpacity
//                   style={s.btnOp}
//                   onPress={() => {
//                     this.setState({
//                       textBgStretch:
//                         this.state.textBgStretch === 2
//                           ? 0
//                           : this.state.textBgStretch + 1,
//                     });
//                   }}>
//                   <Text style={s.text}>
//                     text bg stretch:{' '}
//                     {this.state.textBgStretch === 0
//                       ? 'fit'
//                       : textBgStretch[this.state.textBgStretch]}
//                   </Text>
//                 </TouchableOpacity>
//               ) : null}
//             </View>
//           ) : null}
//           <View style={{flex: 1}}>
//             {this.state.show ? (
//               <Image
//                 source={{uri: this.state.uri}}
//                 resizeMode="contain"
//                 style={s.preview}
//               />
//             ) : null}
//           </View>
//         </ScrollView>
//         {this.state.loading && (
//           <View
//             style={{
//               position: 'absolute',
//               width,
//               height,
//               backgroundColor: 'rgba(0,0,0,0.5)',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}>
//             <ActivityIndicator size="large" />
//             <Text style={{color: 'white'}}>loading...</Text>
//           </View>
//         )}
//       </View>
//     );
//   }

//   _showLoading = () => {
//     this.setState({
//       loading: true,
//     });
//   };

//   _markByPosition = type => {
//     this._showLoading();
//     if (this.state.markImage) {
//       Marker.markImage({
//         src: this.state.image,
//         markerSrc: this.state.markImage,
//         position: type,
//         scale: 1,
//         markerScale: 1,
//         quality: 100,
//         saveFormat: this.state.saveFormat,
//       })
//         .then(path => {
//           this.setState({
//             uri:
//               this.state.saveFormat === ImageFormat.base64
//                 ? path
//                 : Platform.OS === 'android'
//                 ? 'file://' + path
//                 : path,
//             show: true,
//             loading: false,
//           });
//         })
//         .catch(err => {
//           console.log('====================================');
//           console.log(err, 'err');
//           console.log('====================================');
//         });
//     } else {
//       Marker.markText({
//         src: this.state.image,
//         text: `text marker
//          muiltline text`,
//         position: type,
//         color: '#FF0000',
//         fontName: 'Arial-BoldItalicMT',
//         fontSize: 44,
//         scale: 1,
//         quality: 100,
//         shadowStyle: this.state.useTextShadow
//           ? {
//               dx: 10.5,
//               dy: 20.8,
//               radius: 20.9,
//               color: '#0000FF',
//             }
//           : null,
//         textBackgroundStyle: this.state.useTextBgStyle
//           ? {
//               type: textBgStretch[this.state.textBgStretch],
//               paddingX: 10,
//               paddingY: 10,
//               color: '#0f0',
//             }
//           : null,
//         saveFormat: this.state.saveFormat,
//       })
//         .then(path => {
//           this.setState({
//             show: true,
//             uri:
//               this.state.saveFormat === ImageFormat.base64
//                 ? path
//                 : Platform.OS === 'android'
//                 ? 'file://' + path
//                 : path,
//             loading: false,
//           });
//         })
//         .catch(err => {
//           console.log('====================================');
//           console.log(err);
//           console.log('====================================');
//         });
//     }
//   };

//   _mark = () => {
//     this._showLoading();
//     if (this.state.markImage) {
//       Marker.markImage({
//         src: this.state.image,
//         markerSrc: this.state.marker,
//         X: 100,
//         Y: 150,
//         scale: 1,
//         markerScale: 0.5,
//         quality: 100,
//         saveFormat: this.state.saveFormat,
//       })
//         .then(path => {
//           this.setState({
//             uri:
//               this.state.saveFormat === ImageFormat.base64
//                 ? path
//                 : Platform.OS === 'android'
//                 ? 'file://' + path
//                 : path,
//             show: true,
//             loading: false,
//           });
//         })
//         .catch(err => {
//           console.log('====================================');
//           console.log(err, 'err');
//           console.log('====================================');
//         });
//     } else {
//       Marker.markText({
//         src: this.state.image,
//         text: this.props.mycaption,
//         X: 30,
//         Y: 30,
//         color: '#FF0',
//         fontName: 'Arial-BoldItalicMT',
//         fontSize: 44,
//         shadowStyle: this.state.useTextShadow
//           ? {
//               dx: 10.5,
//               dy: 20.8,
//               radius: 20.9,
//               color: '#0000FF',
//             }
//           : null,
//         textBackgroundStyle: this.state.useTextBgStyle
//           ? {
//               type: textBgStretch[this.state.textBgStretch],
//               paddingX: 10,
//               paddingY: 10,
//               color: '#0f0',
//             }
//           : null,
//         scale: 1,
//         quality: 100,
//         saveFormat: this.state.saveFormat,
//       })
//         .then(path => {
//           this.setState({
//             show: true,
//             uri:
//               this.state.saveFormat === ImageFormat.base64
//                 ? path
//                 : Platform.OS === 'android'
//                 ? 'file://' + path
//                 : path,
//             loading: false,
//           });
//         })
//         .catch(err => {
//           console.log('====================================');
//           console.log(err);
//           console.log('====================================');
//         });
//     }
//   };

//   _pickImage = type => {
//     let options = {
//       title: 'title',
//       takePhotoButtonTitle: 'camera',
//       chooseFromLibraryButtonTitle: 'gallery',
//       cancelButtonTitle: 'cancel',
//       quality: 0.5,
//       mediaType: 'photo',
//       maxWidth: 2000,
//       noData: true,
//       maxHeight: 2000,
//       dateFormat: 'yyyy-MM-dd HH:mm:ss',
//       storageOptions: {
//         skipBackup: true,
//         path: 'imagePickerCache',
//       },
//       allowsEditing: false,
//     };
//     Picker.showImagePicker(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       } else if (response.error) {
//         console.log('ImagePickerManager Error: ', response.error);
//       } else if (response.customButton) {
//         // this.showCamera();
//       } else {
//         // You can display the image using either:
//         // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
//         const uri = response.uri;
//         if (type === 'image') {
//           this.setState({
//             image: uri,
//           });
//         } else {
//           this.setState({
//             marker: uri,
//           });
//         }
//       }
//     });
//   };
// }
