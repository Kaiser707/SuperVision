import React, {Component} from 'react'
import{
    Text,
    StyleSheet,
    View,
    ScrollView,
    TextInput,
    Modal
} from 'react-native'

import Share from 'react-native-share'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ion from 'react-native-vector-icons/Ionicons'
import {ConfirmDialog} from 'react-native-simple-dialogs'

import ImagePicker from 'react-native-image-crop-picker'


class Output extends Component{


    constructor(props){
        super(props)

        this.state = {
            boldState: '',
            italicState: '',
            underlineState: '',
            outputSet: this.props.route.params.resultSet,
            modalState: false
        }

    }

    makeBold = () => {

        this.setState({
            boldState: "bold"
        })
        
    }

    makeItalic = () => {

        this.setState({
            italicState: "italic"
        })
    }

    makeUnderline = () => {

        this.setState({
            underlineState: "underline"
        })
    }

    shareText = () => {
        const shareOptions = {
            message: this.state.outputSet.toString()
        }
        Share.open(shareOptions)
    }

    setText = (text) => {
        this.setState({
            outputSet: text
        })
    }

    cancelModal = () => {
        this.setState({
            modalState: false
        })
    }

    render(){  

        return(
            
            <View style = {styles.mainContainer}>

                <ConfirmDialog
                    title="Are you sure about that?"
                    message="You will lose any changes made"
                    visible={this.state.modalState}
                    onTouchOutside={() => this.setState({modalState: false})}
                    positiveButton={{
                        title: "YES",
                        onPress: () => {
                        this.setState({modalState: false})
                        this.props.navigation.navigate('Landing')
        
                    }
                    }}
                    negativeButton={{
                        title: "NO",
                        onPress: () => this.setState({modalState: false})
                    }}
                />

                <View style = {styles.topBar}>

                    <View style = {{left: '15%'}}>
                        <TouchableOpacity onPress = {() => this.setState({modalState: true})}>
                            <Ion name = "arrow-back" size = {30} style = {[styles.topBarIcons]}/>
                        </TouchableOpacity>    
                    </View>
                    <View>
                        <Text style = {styles.topBarText}>Scan Result</Text>
                    </View>
                    <View style = {{flexDirection: 'row', left: '-7%'}}>
                        <TouchableOpacity>
                            <Ion name = "share-social-outline" size = {30} onPress = {this.shareText} style = {styles.topBarIcons}/>
                        </TouchableOpacity>
                        
                    </View>   

                </View>

                <ScrollView style = {styles.scr}>                   
                        <TextInput multiline = {true} onChangeText = {text => this.setText(text)} style = {{fontSize: 16, fontWeight: this.state.boldState, fontStyle: this.state.italicState, textDecorationLine: this.state.underlineState }}>{this.state.outputSet}</TextInput>                   
                </ScrollView>

                <View style = {styles.changeFontStyle}>

                    <TouchableOpacity style = {styles.iconButtonStyle}>
                        <Icon name = "bold" size = {30} style = {styles.iconStyle} onPress = {this.makeBold} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.iconButtonStyle}>
                        <Icon name = "italic" size = {30} style = {styles.iconStyle} onPress = {this.makeItalic} />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.iconButtonStyle}>
                        <Icon name = "underline" size = {30} style = {styles.iconStyle} onPress = {this.makeUnderline} />
                    </TouchableOpacity>
                    
                </View>
            </View>
           
        )
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    modalStyle: {     
        alignItems: 'center',
        top: '40%',
        width: '75%',
        left: '12.5%',
        height: '20%',
        borderRadius: 10,
        borderColor: '#2d99c9',
        borderWidth: 1,
        backgroundColor: 'white'
    },
    modalInnerButtons: {
        flexDirection: 'row',
        alignItems: 'center', 
        top: '27.5%',
        left: '40%'
    },
    topBar: {
        backgroundColor: '#2d99c9',
        height: '8%',
        color: 'blue',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topBarText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Poppins-Medium'
    },
    topBarIcons: {
        color: 'white'
    },
    changeFontStyle: {
        backgroundColor: '#2d99c9',
        height: '10%',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconStyle: {
        top: '3%',
        alignItems: 'center',
        color: 'white',
        opacity: 2
    },
    scr: {
        width: '85%',
        top: '2%'
    },
    iconButtonStyle: {
        backgroundColor: '#2680a6',
        borderRadius: 50,
        height: 50,
        width: 50,
        top: '17.5%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Output