import React from 'react';
import { StyleSheet, AsyncStorage, ScrollView } from 'react-native';
import {Button, Icon, Text, ListItem, Item, Picker, Form, Body, Toast, Content, View, Spinner} from 'native-base';
import CheckBox from 'react-native-checkbox';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {save} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen4 extends React.Component {
    constructor(props) {
        super(props);

        index = new Array();
        this.state = {
            loaded: true,
            selected: null,
            selected: ["key0", "key0", "key0", "key0", "key0", "key1"],
            selected2: index,
        }

    }

    onValueChange(idx: int, value: string) {
        let list = this.state.selected;
        list[idx] = value;
        this.setState({
            selected: list
        });
    }

    render() {
        const saveAndGoToScreen5 = () => {
            global.object.answer1 = this.state.selected;
            global.object.answer2 = this.state.selected2;
            save(AsyncStorage, JSON.stringify(global.object))
            Actions.screen5();
        }
        const toast = () => Toast.show({
            text: global.language.screen4help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        return this.state.loaded ? (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question1} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected[0]}
                            onValueChange={this.onValueChange.bind(this, 0)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={global.language.answer1.key0} value="key0"/>
                            <Item label={global.language.answer1.key1} value="key1"/>
                            <Item label={global.language.answer1.key2} value="key2"/>
                            <Item label={global.language.answer1.key3} value="key3"/>
                            <Item label={global.language.answer1.key4} value="key4"/>
                        </Picker>
                    </Form>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question2} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected[1]}
                            onValueChange={this.onValueChange.bind(this, 1)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={global.language.answer2.key0} value="key0"/>
                            <Item label={global.language.answer2.key1} value="key1"/>
                            <Item label={global.language.answer2.key2} value="key2"/>
                            <Item label={global.language.answer2.key3} value="key3"/>
                            <Item label={global.language.answer2.key4} value="key4"/>
                        </Picker>
                    </Form>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question3} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected[2]}
                            onValueChange={this.onValueChange.bind(this, 2)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={global.language.answer3.key0} value="key0"/>
                            <Item label={global.language.answer3.key1} value="key1"/>
                            <Item label={global.language.answer3.key2} value="key2"/>
                            <Item label={global.language.answer3.key3} value="key3"/>
                            <Item label={global.language.answer3.key4} value="key4"/>
                        </Picker>
                    </Form>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question4} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected[3]}
                            onValueChange={this.onValueChange.bind(this, 3)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={global.language.answer4.key0} value="key0"/>
                            <Item label={global.language.answer4.key1} value="key1"/>
                            <Item label={global.language.answer4.key2} value="key2"/>
                            <Item label={global.language.answer4.key3} value="key3"/>
                            <Item label={global.language.answer4.key4} value="key4"/>
                        </Picker>
                    </Form>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question5} </Text>
                    </ListItem>
                    <Form style={{paddingLeft: 18}}>
                        <Picker
                            iosHeader="Select one"
                            mode="dropdown"
                            selectedValue={this.state.selected[4]}
                            onValueChange={this.onValueChange.bind(this, 4)}
                        >
                            {/* TODO *****************

                            *************************/}
                            <Item label={global.language.answer5.key0} value="key0"/>
                            <Item label={global.language.answer5.key1} value="key1"/>
                            <Item label={global.language.answer5.key2} value="key2"/>
                            <Item label={global.language.answer5.key3} value="key3"/>
                            <Item label={global.language.answer5.key4} value="key4"/>
                        </Picker>
                    </Form>
                    <ListItem style={{marginLeft: 0, paddingLeft: 18}}>
                        <Text> {global.language.question6} </Text>
                    </ListItem>
                    <Item
                      onPress={() => {
                        let newSelected = this.state.selected2;

                        if((idx = newSelected.indexOf('key1'))!=-1)
                          newSelected.splice(idx, 1);
                        else
                          newSelected.push('key1');
                        
                        this.setState({selected6: newSelected});
                      }}
                      style={{marginLeft: 0, paddingLeft: 18}}
                      >
                      <CheckBox
                        checked = {this.state.selected2.indexOf('key1') != -1}
                        label = {global.language.answer6.key1}
                        onChange={() => {
                          let newSelected = this.state.selected2;

                          if((idx = newSelected.indexOf('key1'))!=-1)
                            newSelected.splice(idx, 1);
                          else
                            newSelected.push('key1');
                          
                          this.setState({selected6: newSelected});
                        }}
                      />
                    </Item>
                    <Item
                      onPress={() => {
                        let newSelected = this.state.selected2;

                        if((idx = newSelected.indexOf('key2'))!=-1)
                          newSelected.splice(idx, 1);
                        else
                          newSelected.push('key2');
                        
                        this.setState({selected6: newSelected});
                      }}
                      style={{marginLeft: 0, paddingLeft: 18}}
                      >
                      <CheckBox
                        checked = {this.state.selected2.indexOf('key2') != -1}
                        label = {global.language.answer6.key2}
                        onChange={() => {
                          let newSelected = this.state.selected2;

                          if((idx = newSelected.indexOf('key2'))!=-1)
                            newSelected.splice(idx, 1);
                          else
                            newSelected.push('key2');
                          
                          this.setState({selected6: newSelected});
                        }}
                      />
                    </Item>
                    <Item
                      onPress={() => {
                        let newSelected = this.state.selected2;

                        if((idx = newSelected.indexOf('key3'))!=-1)
                          newSelected.splice(idx, 1);
                        else
                          newSelected.push('key3');
                        
                        this.setState({selected2: newSelected});
                      }}
                      style={{marginLeft: 0, paddingLeft: 18}}
                      >
                      <CheckBox
                        checked = {this.state.selected2.indexOf('key3') != -1}
                        label = {global.language.answer6.key3}
                        onChange={() => {
                          let newSelected = this.state.selected2;

                          if((idx = newSelected.indexOf('key3'))!=-1)
                            newSelected.splice(idx, 1);
                          else
                            newSelected.push('key3');
                          
                          this.setState({selected2: newSelected});
                        }}
                      />
                    </Item>

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
