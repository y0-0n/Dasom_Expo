import React from 'react';
import { Toast, Content, Text, ListItem, Icon, Spinner, View, Button } from 'native-base';
import { AsyncStorage, ScrollView } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Part extends React.Component {
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
    }

    render() {
        var arrayKey;
        const toast = () => Toast.show({
            text: this.state.language.screen2help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        
        if(this.state.loaded) {
            arrayKey = getData2()[this.props.part];
            arrayKey.sort();
        }
        return this.state.loaded? (
                <View style={{flex: 1}}>
                    <ScrollView>
                    {arrayKey.map( (s,i) => {
                        return <ListItem
                            key={i}
                            style={{marginLeft: 0, paddingLeft: 18}}
                            onPress={() => Actions.symptom({
                                where: arrayKey[i],
                                symptom: this.props.symptom
                            })}
                        >
                            <Text> {this.state.language.part[s]} </Text>
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
                        <BottomToolbar.Action
                            title=""
                            onPress={toast}
                            IconComponent= {Icon}
                            iconName = 'help'
                        />
                        <BottomToolbar.Action
                            title=""
                        />
                    </BottomToolbar>
                </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}
