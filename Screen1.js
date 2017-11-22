import React from 'react';
import { Dimensions, Alert, AsyncStorage, Platform, StyleSheet, View, ScrollView, Image, Linking } from 'react-native';
import { Button, Text, Content, Body, Icon, Spinner, Card, CardItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {setLanguage, isFirstLaunch, getLanguage} from './AsyncStorage.js';
import Swiper from 'react-native-swiper';
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
        this.height = Dimensions.get('window').height-80;
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
                this.setState({
                    language: getData(key),
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
        return this.state.loaded ? (<ScrollView>
            <View style={{flexDirection: 'column', backgroundColor: 'white', height: this.height}}>
                <View style={styles.card}>
                    <Image source={require('./img/cotton.png')} />
                </View>
                <View style={styles.card2}>
                    <Button style={styles.button} onPress={() => Actions.screen2()}>
                        <Text style={styles.text}>
                            {this.state.language.screen1.useNow}
                        </Text>
                    </Button>
                    {!global.googleMaps? <Button style={styles.button} onPress={() => this.googleMapsDownload()}>
                        <Text style={styles.text}>
                            Google Maps 
                            <Icon name='cloud-download' style={{color: 'white'}}/>
                        </Text>
                    </Button> : null}
                </View>
                <View style={styles.card2}>
                    <Button style={styles.button} onPress={() => Actions.list()}>
                        <Text style={styles.text}>
                            {this.state.language.screen1.list}
                        </Text>
                    </Button>
                    <Button style={styles.button} onPress={() => Actions.mapSelect()}>
                        <Text style={styles.text}>
                            {this.state.language.screen1.map}
                        </Text>
                    </Button>
                </View>
                <View style={styles.card3}>
                    <Swiper autoplay={true}>
                        <Image
                            source={cards[0].image}
                            style={{height: 100, width: '100%', resizeMode: 'stretch'}}
                         />
                        <Image
                            source={cards[1].image}
                            style={{height: 100, width: '100%', resizeMode: 'stretch'}}
                         />
                        <Image
                            source={cards[2].image}
                            style={{height: 100, width: '100%', resizeMode: 'stretch'}}
                         />
                    </Swiper>
                    {/*<DeckSwiper
                        dataSource={cards}
                        renderItem={item => 
                            <Card>
                                <Image
                                    source={item.image}
                                    style={{height: 150, width: '100%', resizeMode: 'stretch'}}
                                 />
                            </Card>
                        }
                    />*/}
                </View>
            </View>
            </ScrollView>
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
        height: 40,
        paddingTop: 10,
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 2.5,
        marginBottom: 5,
        backgroundColor: '#3db7f0',
        height: 100,
        flex: 1
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '47%'
    },
    card2: {
        flexDirection: 'row',
        height: '18%'
    },
    card3: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        height: '20%',
        flex: 1
    }
});
