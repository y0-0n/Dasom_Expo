import React from 'react';
import { Alert, AsyncStorage, StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Icon, Spinner, ListItem, Item, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import {load, getLanguage} from './AsyncStorage.js';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            empty: false
        };

        load(AsyncStorage).then( (key) => {
            if (key==null) {
                Alert.alert(
                    global.language.noList,
                    null,
                    [
                        {text: 'OK', onPress: () => Actions.screen1()},
                    ],
                    { cancelable: false }
                )
            }
            else {
                global.chiefSymptom = JSON.parse(key).chiefSymptom;
                global.array = Object.values(JSON.parse(key).symptom);
                global.answer1 = JSON.parse(key).answer1;
                global.answer2 = JSON.parse(key).answer2;
                this.setState({
                    loaded: true
                });
            }
        });
    }
    
    render() {
        let korLanguage = getData('ko');
        return this.state.loaded? (<View style={{flex: 1}}>
            <ScrollView>
                <ListItem style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 18}}>
                      {korLanguage.listChiefSymptom}
                      {'\t('+global.language.listChiefSymptom+')'}
                    </Text>
                </ListItem>
                <View style={{ marginTop: 5, marginBottom: 5}}>
                    <Text style={{textAlign: 'right', width: '100%', paddingRight: 18, fontSize: 22}}>
                        {'\t'+korLanguage.part[global.chiefSymptom.where]} -> {korLanguage.symptom[global.chiefSymptom.symptom]}
                    </Text>
                </View>
                {global.array.map((s1, i1) => {
                    let array3 = s1.array;
                    return <View key={i1}>
                        <View style={{padding: 22, backgroundColor: 'white'}}>
                            <Text style={{fontSize: 22}}>
                                {korLanguage.part[s1.where]}
                                {'('+global.language.part[s1.where]+') '}
                                에 문제가 있어요
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{borderRightWidth: 0.2, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text> 상세 </Text>
                            </View>
                            <View style={{flex: 7}}>
                        {array3.map((s2,i2) => {
                            return <View key={i2}>
                                <Item
                                    style={{marginLeft: 0, paddingLeft: 18, paddingTop: 5, paddingBottom: 5}}
                                >
                                    <Text style={{fontSize: 22}}>
                                        {korLanguage.symptom[s2]}
                                    </Text>
                                </Item>
                                <Item
                                    style={{marginLeft: 0, paddingLeft: 18, paddingTop: 4, paddingBottom: 4}}
                                >
                                    <Text style={{textAlign: 'right', width: '100%', paddingRight: 18}}>
                                        {global.language.symptom[s2]}
                                    </Text>
                                </Item>
                            </View>
                        })}
                            </View>
                        </View>
                    </View>
                })}
                <ListItem style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                      환자의 답변
                    </Text>
                </ListItem>
                <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question1}
                    </Text>
                </Item>
                <Item style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                        {korLanguage.answer1[global.answer1[0]]}이후로 아팠어요
                    </Text>
                </Item>
                {global.answer1[1]!='key0'? <View>
                  <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question2}
                    </Text>
                  </Item>
                  <Item style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                        {korLanguage.answer2[global.answer1[1]]}
                    </Text>
                  </Item>
                </View> : null}
                {global.answer1[2]!='key0'? <View>
                  <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question3}
                    </Text>
                  </Item>
                  <Item style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                        {korLanguage.answer3[global.answer1[2]]}
                    </Text>
                  </Item>
                </View> : null}
                {global.answer1[3]!='key0'? <View>
                  <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question4}
                    </Text>
                  </Item>
                  <Item style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                        {korLanguage.answer4[global.answer1[3]]}
                    </Text>
                  </Item>
                </View> : null}
                <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question5}
                    </Text>
                </Item>
                <Item style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}} >
                        {korLanguage.answer5[global.answer1[4]]}
                    </Text>
                </Item>
                {global.answer2.length!=0 ? <Item style={{paddingLeft: 18, marginLeft: 0, backgroundColor: 'green'}}>
                    <Text style={{fontSize: 22, color: 'white'}} >
                        {korLanguage.question6}
                    </Text>
                </Item> : null
                }
                {global.answer2.map((s, i) => {
                  return <Item key={i} style={{paddingLeft: 18, marginLeft: 0}}>
                    <Text style={{fontSize: 22}}>
                      {korLanguage.answer6[s]}
                    </Text>
                  </Item>
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
        </View>) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}
