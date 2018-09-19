import React from 'react';
import { ListItem, Text, Content, Spinner } from 'native-base';
import { AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {getData} from './getData';
import {getLanguage, setLanguage} from './AsyncStorage.js';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Content>
                <ListItem style={{marginLeft: 0, paddingLeft: 18}}
                    onPress = {
                        () => {
                            setLanguage(AsyncStorage, 'ko').then(()=>{
                                Actions.screen1();
                                this.props.containerRefresh();
                            })
                        }
                    }
                >
                    <Text> 한국어 </Text>
                </ListItem>
                <ListItem style={{marginLeft: 0, paddingLeft: 18}}
                    onPress = {
                        () => {
                            setLanguage(AsyncStorage, 'en').then(()=>{ 
                                Actions.screen1();
                                this.props.containerRefresh();
                            })
                        }
                    }
                >
                    <Text> English </Text>
                </ListItem>
                {/*<ListItem style={{marginLeft: 0, paddingLeft: 18}}
                    onPress = {
                        () => {
                            setLanguage(AsyncStorage, 'th').then(()=>{ 
                                Actions.screen1();
                                this.props.containerRefresh();
                            })
                        }
                    }
                >
                    <Text> Thailand </Text>
                </ListItem>*/}
                <ListItem style={{marginLeft: 0, paddingLeft: 18}}
                    onPress = {
                        () => {
                            setLanguage(AsyncStorage, 'ru').then(()=>{ 
                                Actions.screen1();
                                this.props.containerRefresh();
                            })
                        }
                    }
                >
                    <Text> Russian </Text>
                </ListItem>
            </Content>
    }
}
