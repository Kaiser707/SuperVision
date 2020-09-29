import React, {Component} from 'react'
import vision from '@react-native-firebase/ml-vision'
import{
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {RNCamera} from 'react-native-camera'

import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome5'

class Cam extends Component{


    constructor(props){
      super(props)

      this.state = {
        pickList : [],
        scannedText : ""
      }
    }

    scanImage = async () => {
      this.scanText()
    }


    extraction = async(img) => {                                            // Extract the text from image file
      const processed = await vision().textRecognizerProcessImage(img.path)

      processed.blocks.forEach(block => {
         this.setState({
           pickList: [...this.state.pickList, block.text]
         })
       })

       this.props.navigation.navigate('Output', {resultSet: this.state.pickList})

       this.setState({
           pickList: []
       })
      
    }

    scanText = async() => {
        const options = {quality: 0.5, base64: true}
        const data = await this.camera.takePictureAsync(options)
        const processed = await vision().textRecognizerProcessImage(data.uri);  // processes text from uri path where image is stored in cache

        var blockString =  ""

        processed.blocks.forEach(block => {
          
          blockString = blockString + block.text
          blockString = blockString + "\n"
          this.setState({
            scannedText : blockString
          })
        })

        this.props.navigation.navigate('Output', {resultSet: this.state.scannedText, origin: 'Camera'})  // send data to output screen

        this.setState({
          scannedTet: ""
        })
    } 

  
    render(){
        return(
         
        <RNCamera
          style={{ flex: 1, alignItems: 'center' }}
          ref={ref => {
            this.camera = ref
          }}
          zoom = {0}
          type={RNCamera.Constants.Type.back}
        >


        {/* <TouchableOpacity style = {styles.imageSelector} onPress = {this.pickImage}>
            <Icon name = "image" size = {40} color = "#ffffff" />
        </TouchableOpacity> */}

        <TouchableOpacity style = {styles.capRing} onPress = {this.scanImage}>  
            <TouchableOpacity style = {styles.capbutton} onPress = {this.scanImage}>
            </TouchableOpacity>
        </TouchableOpacity>

        <Text style = {styles.cambuttonText}>Place above text to scan</Text>

        </RNCamera>
        
        )
    }
}

const styles = StyleSheet.create({
  capbutton: {
    backgroundColor: 'white',
    opacity: 0.7,
    alignItems: 'center',
    
    borderRadius: 80,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  capRing: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    width: 100,
    height: 100,
    borderColor: 'white',
    borderWidth: 2,
    top: '75%'
  },
  cambuttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: "200",
    top: '78%',
    fontFamily: 'Poppins-Light'
  },
  actionButtonText: {
    color: 'white'
  },
  imageSelector: {
    borderRadius: 50,
    top: '78%',
    left: '40%'
  },
  selectorBar: {
    backgroundColor: '#ffffff',
    top: 0,
    alignSelf: 'stretch',
    height: '7%',
    flexDirection: 'row'
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  actionButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButtonColor: {
    backgroundColor: '#221f3b'
  }
});

export default Cam