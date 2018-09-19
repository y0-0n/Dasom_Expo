import React from 'react';
import { Dimensions, Alert, AsyncStorage, Platform, BackHandler, StyleSheet, View, ScrollView, Image, Linking } from 'react-native';
import { ListItem, Button, Text, Content, Left, Body, Icon, Spinner, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {setLanguage, isFirstLaunch, getLanguage} from './AsyncStorage.js';
import Swiper from 'react-native-swiper';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

export default class Screen1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };

        this.googleMapsDownload = () => {Platform.OS=='ios'?
            Linking.openURL("https://itunes.apple.com/kr/app/google-maps/id585027354?mt=8"):
            Linking.openURL("https://play.google.com/store/apps/details?id=com.google.android.apps.maps")
        }
        this.height = Dimensions.get('window').height-60;
    }

    componentWillMount() {
        isFirstLaunch(AsyncStorage).then((key) => {
            if(key == null) {
                Actions.firstLaunch();
            }
        });
        getLanguage(AsyncStorage).then((key) => {
            if(key == null) {
               Actions.language();
            } else {
                global.language = getData(key);
                global.local = key;
                this.setState({
                    loaded: true
                });
            }
        });
    
        if (Platform.OS == 'ios') {
            //TODO :: It doesn't work. Find another method!
            Linking.canOpenURL('comgooglemaps://')
                .then((installed) => {
                    if(!installed) {
                        /*Alert.alert(
                            'No App',
                            null,
                            [
                                {text: 'OK', onPress: () => {this.googleMapsDownload()}},
                                {text: 'NO', onPress: () => {}},
                            ],
                            { cancelable: true }
                        )*/
                    }
                });
        }
        else if (Platform.OS == 'android') {
            Linking.canOpenURL('google.maps://')
                .then((installed) => {
                    if(!installed) {
                        /*Alert.alert(
                            'No App',
                            null,
                            [
                                {text: 'OK', onPress: () => {this.googleMapsDownload()}},
                                {text: 'NO', onPress: () => {}},
                            ],
                            { cancelable: true }
                        )*/
                        global.googleMaps = false
                    }
                    else {
                        global.googleMaps = true
                    }
                });
        }

    }
    //const AnimatedCustomScrollView = Animated.createAnimatedComponent(CustomScrollView)
      
    render() {
        const cards = [
            {
                image: require('./img/resources.jpg')
            },
            {
                image: require('./img/resources2.jpeg')
            },
            {
                image: require('./img/resource3.png')
            }
        ]
        return this.state.loaded ? (
            <ParallaxScrollView
              parallaxHeaderHeight={300}
              backgroundColor= 'lightgray'
              contentBackgroundColor= 'lightgray'
              renderForeground={()=>(
                <View style={{height:300}}>
                  <Swiper autoplay={true}>
                    <Image
                      source={cards[0].image}
                      style={{height: 300, width: '100%', resizeMode: 'stretch'}}
                    />
                    <Image
                      source={cards[1].image}
                      style={{height: 300, width: '100%', resizeMode: 'stretch'}}
                    />
                    <Image
                      source={cards[2].image}
                      style={{height: 300, width: '100%', resizeMode: 'stretch'}}
                    />
                  </Swiper>
                </View>
              )}>
                <Card style={styles.button}>
                  <CardItem style={{height: 100}} button onPress={() => Actions.screen2()}>
                    <Left>
                      <Body>
                        <Text style={styles.text}>
                          {global.language.screen1.useNow}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
                {/*!global.googleMaps? <Button style={styles.button} onPress={() => this.googleMapsDownload()}>
                    <Text style={styles.text}>
                        Google Maps 
                        <Icon name='cloud-download' style={{color: 'white'}}/>
                    </Text>
                </Button> : null*/}
                <Card style={styles.button}>
                  <CardItem style={{height: 100}} button onPress={() => Actions.list()}>
                    <Left>
                      <Body>
                        <Text style={styles.text}>
                          {global.language.screen1.list}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
                <Card style={styles.button}>
                  <CardItem style={{height: 80}} button onPress={() => Actions.mapSelect()}>
                    <Left>
                      <Body>
                        <Text style={styles.text}>
                          {global.language.screen1.map}
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
                <Card style={styles.button}>
                  <CardItem style={{height: 80}}>
                    <Left>
                      <Body>
                        <Text style={styles.text}>
                          Help
                        </Text>
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
                <Card style={styles.button}>
                  <CardItem>
                    <Image
                      source={require('./img/cotton.png')}
                      style={{height:80, resizeMode:'contain'}}
                    />
                  </CardItem>
                </Card>
            </ParallaxScrollView>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
  }
}

const styles = StyleSheet.create({
  head: {
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'open-sans-regular',
    color: 'black',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%'
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
  }
});
