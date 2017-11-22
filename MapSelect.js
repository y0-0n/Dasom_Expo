import React from 'react';
import { Icon, Content, Text, ListItem, Spinner, View, Button } from 'native-base';
import { AsyncStorage, ScrollView, Linking, Platform, Alert } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class MapSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        }

        getLanguage(AsyncStorage).then((key) => {
            global.language = key
            
            this.setState({
                language: getData(key),
                loaded: true
            });
        });
        /*Linking.canOpenURL("comgogoglemaps://www.google.com/maps/search/?api=1&parametes")
            .then((key) => {
                //Linking.openURL("https://www.google.com/maps/search/?api=1&parameters")
            });
        */
    }

    render() {
        var array;
        korLanguage = getData('ko')
        if(this.state.loaded)
            array = this.state.language.department;

        return this.state.loaded? (
            <View style={{flex: 1}}>
                <ScrollView>
                    {array.map( (s,i) => {
                        return <ListItem
                            key={i}
                            style={{marginLeft: 0, paddingLeft: 18}}
                            onPress={() => Linking.openURL('https://www.google.com/maps/search/'+korLanguage.department[i]+'/My+Location')
                            /*Linking.canOpenURL('google.maps://')
                            .then((enable) => {
                                if(!enable) {
                                    Linking.openURL('https://www.google.com/maps/search/'+korLanguage.department[i]+'/My+Location')
                                } else {
                                    Alert.alert(
                                        'Google Maps를 설치해야 이용할 수 있습니다.',
                                        null,
                                        [
                                            {text: 'OK', onPress: () => {}},
                                        ],
                                        { cancelable: true }
                                    )
                                }
                            })*/}
                        >
                            <Text> {array[i]} </Text>
                        </ListItem>
                    })}
                </ScrollView>
                <BottomToolbar>
                    <BottomToolbar.Action
                        title=''
                        onPress={() => Actions.pop()}
                        IconComponent= {Icon}
                        iconName = 'arrow-back'
                    />
                </BottomToolbar>
            </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}
