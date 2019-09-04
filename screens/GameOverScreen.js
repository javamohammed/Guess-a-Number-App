import React from 'react';
import { StyleSheet, View, Button, Image, Text,Dimensions,ScrollView } from 'react-native';
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../instants/Colors';
import MainButton from '../components/MainButton'

export default function GameOverScreen(props) {
  return (
    <ScrollView>
        <View style={styles.screen}>
        <TitleText>The Game is Over !!</TitleText>

        <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.image} resizeMode='cover' source={{uri: 'https://blog.strava.com/wp-content/uploads/2018/06/DSC02332-1.jpg'}}/>*/}
          <Image style={styles.image} resizeMode='cover' source={require('../assets/success.png')}  />
          </View>
          <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>
                      Your phone needed
                      <Text style={styles.highlight} > {props.roundsNumber} </Text>
                      rounds to guess this number
                      <Text style={styles.highlight}> {props.userNumber} </Text>
            </BodyText>
          </View>
        <MainButton onPress={props.onRestart} >New Game</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    //width: 300,
    //height: 300,
    width: Dimensions.get('window').height > 600 ? 300 : 200,
    height: Dimensions.get('window').height > 600 ? 300 : 200,
    borderRadius: 150,
    borderWidth: 3,
    overflow: 'hidden',
    marginVertical: 10,
    borderColor: 'black'
  },
  resultContainer:{
    marginHorizontal: 30,
    marginVertical:10
  },
  resultText:{
    textAlign: 'center',
    fontSize: 18
  },
  highlight:{
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  }
});