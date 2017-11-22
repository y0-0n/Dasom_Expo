import React from 'react';
import { WebView, AsyncStorage } from 'react-native';
import { Content, Text, Spinner, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { getLanguage } from './AsyncStorage.js';
import {getData} from './getData.js';
import Geolocation from 'react-native-geolocation-service';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentWillMount() {
        getLanguage(AsyncStorage).then((key) => {
            this.setState({
                hl: key,
                language: getData(key),
                loaded: true
            });
        });
        Geolocation.getCurrentPosition((position) => {
            this.setState({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            })
        })
    }

    render() {
        return this.state.loaded ? (
            <View style={{flex: 1}}>
                <WebView
                    source={{uri: 'https://www.google.co.kr/maps/search/'+this.props.search+'/@'+this.state.latitude+','+this.state.longitude+',17z?hl='+this.state.hl}}
                />
                <BottomToolbar>
                    <BottomToolbar.Action
                        title={this.state.language.back}
                        onPress={() => Actions.pop()}
                    />
                </BottomToolbar>
            </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)

    }
}
