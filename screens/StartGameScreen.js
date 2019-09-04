import React, { useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button, Keyboard, TouchableWithoutFeedback, Alert,Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Card from '../components/Card'
import Input from '../components/Input'
import Colors from '../instants/Colors'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../instants/default-styles'
import MainButton from '../components/MainButton'
const StartGameScreen = (props) => {
    const [EnteredValue, setEnteredValue] = useState('')
    const [confirmed, SetConfirmed] = useState(false)
    const [SelectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)
    const restInputHandler = () => {
        setEnteredValue('')
        SetConfirmed(false)
    }
    useEffect(() =>{
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change',updateLayout)
        return ()=> {
            Dimensions.removeEventListener('change',updateLayout)
        }
    })
    const numberInputHandler = (inputValue) => {
        setEnteredValue(inputValue.replace(/[^0-9]/g, ''))
    }
    const confirmInputHandler = () => {
        const chooseNumber = parseInt(EnteredValue)
        if (isNaN(chooseNumber)|| chooseNumber <= 0 || chooseNumber > 99){
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99', [{text:'Okay', style:'destructive', onPress: restInputHandler}])
            return
        }
        SetConfirmed(true)
        setSelectedNumber(chooseNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }
    let confirmOutput;
    if (confirmed) {
        confirmOutput = <Card style={styles.summaryContainer}>
            <Text>You selected:</Text>
            <NumberContainer>{SelectedNumber}</NumberContainer>
            <MainButton onPress={()=> { props.onChoiceNumber(SelectedNumber)}} >Start Game</MainButton>
        </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={()=>{
            Keyboard.dismiss()
        }}>

            <View style={styles.screen}>
                <Text style={styles.title} >{props.title}</Text>
                <Card style={styles.inputContainer}>
                    <Text style={{ ...DefaultStyles.text }}>Select a number:</Text>
                            <Input style={{ ...styles.input,
                                            ...Platform.select({
                                                ios: styles.inputOS,
                                                android: styles.inputAndroid
                                                })}}
                        blurOnSubmit
                        autoCorrect={false}
                        autoCapitalize='none'
                        keyboardType='number-pad'
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={EnteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={{buttonWidth}}><Button title="Reset" onPress={restInputHandler} color={Colors.accent} /></View>
                        <View style={buttonWidth}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmOutput}
            </View>
        </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:10,
        alignItems: 'center'
    },
    inputContainer:{
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    title:{
        fontSize:20,
        marginVertical: 10

    },
    /*
    button: {
       // width: 90
        width: Dimensions.get('window').width / 4
        //  width: ''40%'

    },*/
    input:{
        width: 50,
        borderBottomWidth:1,
        borderBottomColor:'black',
        marginBottom:10,
        textAlign:'center'
    },
    inputOS:{
        color: 'black',
    },
    inputAndroid:{
        color: 'green',
    },
    summaryContainer: {
        marginTop: 20,
        marginBottom:80,
        alignItems: 'center'
    }
})
export default StartGameScreen