import React, {Component} from 'react'
import{
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import vision from '@react-native-firebase/ml-vision'
import ImagePicker from 'react-native-image-crop-picker'

class Landing extends Component{


    constructor(props){
        super(props)
  
        this.state = {
          pickList : [],
          scannedText : ""
        }
    }

    pickImage = () => {                  // Function for selecting image to scan
        
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
  
            this.extraction(image)          // different function due to await async constraints
  
        });
    }

    extraction = async(img) => {                                            // Extract the text from image file
        const processed = await vision().textRecognizerProcessImage(img.path)

        processed.blocks.forEach(block => {
           this.setState({
             pickList: [...this.state.pickList, block.text]
           })
         })

         this.props.navigation.navigate('Output', {resultSet: this.state.pickList, origin: 'Landing'})

         this.setState({
             pickList: []
         })
        
      }

    render(){
        return(
            <View style = {styles.container}>
                <Image style = {styles.img} source = {require('../assets/Scanner_Image.png')} />
                <Text style = {{fontFamily: 'Poppins-Bold', fontSize: 20, top: '25%'}}>SuperVision</Text>
                <Text style = {styles.secText}>Scan text anywhere any time</Text>

                <TouchableOpacity style = {styles.buttons} onPress = {() => this.props.navigation.navigate('Camera')}>
                    <Text style = {styles.buttonText}>Take picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttons} onPress = {this.pickImage}>
                    <Text style = {styles.buttonText}>Choose image</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e8f4f8'
    },
    img: {
        height: 300,
        width: 400,
        top: '20%'
    },
    buttons: {
        height: 50,
        width: 275,
        backgroundColor: '#2d99c9',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        top: '30%'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },
    secText: {
        top: '25%',
        fontFamily: 'Poppins-Light'
    }
})

export default Landing