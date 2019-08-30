import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userNumber:null,
      guessRounds : 0,
      dataLoaded : false
    }
  }

 async componentWillMount(){
    await Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    })
   this.setState({ dataLoaded:true})
  }

/*
  if (!dataLoaded) {
    <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(error) => console.log(error)} />
  }*/
   configureNewGameHandler = () => {
     this.setState({ userNumber: 0 })
     this.setState({ guessRounds: 0 })
  }
   startGameHandler = (SelectedNumber) => {
     this.setState({ userNumber: SelectedNumber })
  }
   gameOverHandler = (numOfRounds) => {
     this.setState({ guessRounds: numOfRounds})
  }
  render(){
    if (!this.state.dataLoaded) {
      return <AppLoading />;
    }
    let content = <StartGameScreen title="The Game screen" onChoiceNumber={this.startGameHandler} />
    /*
    content = (
      <GameOverScreen
        roundsNumber={1}
        userNumber={1}
        onRestart={this.configureNewGameHandler}
      />
    );
    */
    if (this.state.userNumber && this.state.guessRounds <= 0) {
      content = <GameScreen userChoice={this.state.userNumber} onGameOver={this.gameOverHandler} />
    } else if (this.state.guessRounds > 0) {
      content = <GameOverScreen roundsNumber={this.state.guessRounds} userNumber={this.state.userNumber} onRestart={this.configureNewGameHandler} />
    }
    return (
      <View style={styles.screen}>
        <Header title="Guess a number" />
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
});