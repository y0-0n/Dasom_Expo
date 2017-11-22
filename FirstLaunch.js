import React from 'react';
import { Toast, ListItem, Text, View, Spinner, Item, Icon } from 'native-base';
import { AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {getData} from './getData';
import {getLanguage, setFirstLaunch} from './AsyncStorage.js';
import RadioForm from 'react-native-radio-form';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class FirstLaunch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
        global.object={
            sex: 'male',
        };
    }

    componentWillMount() {
        getLanguage(AsyncStorage).then((key) => {
            if(key == null) {
               Actions.language(); 
            } else {
                this.setState({
                    loaded: true,
                    language: getData(key),
                });
            }
        });
    }
    _onSelect = (item) => {
        global.object.sex = item.value;
    }

    render() {
        const toast = () => Toast.show({
            text: this.state.language.firstLaunchHelp,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        if(this.state.loaded) {
            mockData = [
                {
                    label: this.state.language.male,
                    value: 'female'
                },
                {
                    label: this.state.language.female,
                    value: 'male'
                },
            ];
        }
        return this.state.loaded? (<View style={{flex: 1}}>
            <ScrollView>
                <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                    <Text> {this.state.language.sex} </Text>
                </ListItem>
                <Item>
                    <RadioForm
                        style={{ width: 350 - 30 }}
                        dataSource={mockData}
                        itemShowKey="label"
                        itemRealKey="value"
                        circleSize={16}
                        formHorizontal={true}
                        labelHorizontal={true}
                        onPress={(item) => this._onSelect(item)}
                    />
                </Item>
            </ScrollView>
                <BottomToolbar>
                    <BottomToolbar.Action
                        title=''
                    />
                    <BottomToolbar.Action
                        title=""
                        IconComponent= {Icon}
                        iconName = 'help'
                        onPress={toast}
                    />
                    <BottomToolbar.Action
                        title=''
                        onPress={() => setFirstLaunch(AsyncStorage, global.object).then(() => {
                                Actions.screen1();
                                })}
                        IconComponent= {Icon}
                        iconName = 'arrow-forward'
                    />
                </BottomToolbar>
        </View>) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}
