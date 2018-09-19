import React from 'react';
import { Alert, AsyncStorage, ScrollView, TextInput} from 'react-native';
import { Toast, View, Body, Text, Content, Icon, Spinner, Footer, Button, List, ListItem, Form, Picker, Item, Radio } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import CheckBox from 'react-native-checkbox';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Symptom extends React.Component {

    constructor(props) {
        super(props)

        let where = this.props.where;
        let symptom = getData2().symptom;

        //통증 리스트
        global.lists = symptom[where].map( (symptom,i) => {
            return global.language.symptom[symptom[0]];
        });
        global.lists.sort();

        //체크된 통증 리스트 초기화
        //index = new Array(global.lists.length);
        index = new Array();
        
        let visible = new Array(global.lists.length);
        visible.fill(true);

        this.state = {
            loaded: true,
            selected2: index,
            filter: visible,
            search: global.lists
        }
    }

    question() {
        const goToMoreSymptom = () => Actions.screen2({
            where: this.props.where,
            symptom: this.props.symptom
        });

        global.checked = new Array();//check한 영어 통증

        for (j in this.state.selected2){//check한 번역된 통증을 O(n^2) 탐색으로 영어 통증으로 바꿈 TODO
            for(i in global.language.symptom){
                if(this.state.selected2[j]==global.language.symptom[i]){
                    global.checked.push(i)
                    break;
                }
            }
        }
        global.object.symptom[this.props.where] = {
            where: this.props.where,
            array: global.checked
        };
        Alert.alert(
            global.language.moreSymptom,
            null,
            [
                {text: 'Yes', onPress: () => goToMoreSymptom()},
                {text: 'NO', onPress: () => Actions.screen3()},
            ],
            { cancelable: false }
        ) 
    }

    render() {
        /*let A = lists.map( (s,i) => {
            return <Item key={s[0]} label={s[1]} value={s[1]} />
        });*/
        var B;
        const toast = () => Toast.show({
            text: global.language.symptomHelp,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        if(this.state.loaded) {
            B = this.state.search.map( (s,i) => {
                if(this.state.filter[i] == true) {
                    return <ListItem key={s[0]}
                        key={i}//TODO two key??
                        onPress={() => {
                            let newSelected2 = this.state.selected2;

                            if((idx = newSelected2.indexOf(s))!=-1)
                                newSelected2.splice(idx, 1);
                            else
                                newSelected2.push(s);
                            
                            this.setState({selected2: newSelected2});
                        }}
                        style={{marginLeft: 0, paddingLeft: 18}}
                        >
                        <CheckBox
                            checked = {this.state.selected2.indexOf(s) != -1}
                            label = {s}
                            onChange={() => {
                                let newSelected2 = this.state.selected2;

                                if((idx = newSelected2.indexOf(s))!=-1)
                                    newSelected2.splice(idx, 1);
                                else
                                    newSelected2.push(s);
                                
                                this.setState({selected2: newSelected2});
                            }}
                        />
                    </ListItem>
                }
            });
        }

        return this.state.loaded? (<View style={{flex: 1}}>
            <TextInput
                placeholder="Search"
                style={{height: 50, fontSize: 25}}
                textAlign={"center"}
                autoCapitalize="characters"
                onChangeText={(text) => {
                    var array = [];
                    global.lists.map( (s, i) => {
                        if(s.indexOf(text)!=-1 || s.toLowerCase().indexOf(text)!=-1) {
                            //this.state.filter[i] = true;
                            array.push(s);
                        }
                        else {
                            //this.state.filter[i] = false;
                        }
                    });
                    this.setState({
                        search: array
                    });
                }}
            />
            <ScrollView style={{flex: 1}}>
                {B}
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
                    disabled={this.state.selected2.length==0}
                    title=''
                    onPress={() => this.question()}
                    IconComponent= {Icon}
                    iconName = 'arrow-forward'
                />
            </BottomToolbar>
        </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>);
    }
}
