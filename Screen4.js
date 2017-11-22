import React from 'react';
import { StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import {Button, Icon, Text, ListItem, Item, Picker, Form, Body, Toast, Content, View, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getLanguage, save} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            selected: "key0"
        }

        getLanguage(AsyncStorage).then((key) => {
            this.setState({
                language: getData(key),
                loaded: true
            });
        });
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        const saveAndGoToScreen5 = () => {
            global.object.howLong = this.state.selected;
            save(AsyncStorage, JSON.stringify(global.object))
            Actions.screen5(global.object);
        }
        const toast = () => Toast.show({
            text: this.state.language.screen4help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        return this.state.loaded ? (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {this.state.language.sinceWhen} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={this.state.language.howLong.key0} value="key0"/>
                            <Item label={this.state.language.howLong.key1} value="key1"/>
                            <Item label={this.state.language.howLong.key2} value="key2"/>
                            <Item label={this.state.language.howLong.key3} value="key3"/>
                            <Item label={this.state.language.howLong.key4} value="key4"/>
                        </Picker>
                    </Form>
                    </View>
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
                        title=''
                        onPress={() => saveAndGoToScreen5()}
                        IconComponent= {Icon}
                        iconName = 'arrow-forward'
                    />
                </BottomToolbar>
            </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
  }
}

const styles = StyleSheet.create({
});
