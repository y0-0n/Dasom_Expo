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
                    this.state.language.noList,
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
                global.howLong = JSON.parse(key).howLong;
                
                getLanguage(AsyncStorage).then((key) => {
                    this.setState({
                        language: getData(key),
                        loaded: true
                    });
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
                        가장 급한 증상
                        {'\t('+this.state.language.listChiefSymptom+')'}
                    </Text>
                </ListItem>
                <View style={{ marginTop: 5, marginBottom: 5}}>
                    <Text style={{textAlign: 'right', width: '100%', paddingRight: 18, fontSize: 22}}>
                        {'\t'+korLanguage.part[global.chiefSymptom.where]}에서 {korLanguage.symptom[global.chiefSymptom.symptom]}
                    </Text>
                </View>
                {global.array.map((s1, i1) => {
                    let array3 = s1.array;
                    return <View key={i1}>
                        <View style={{padding: 22, backgroundColor: 'white'}}>
                            <Text style={{fontSize: 22}}>
                                {korLanguage.part[s1.where]}
                                {'('+this.state.language.part[s1.where]+') '}
                                아파요
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
                                        {korLanguage.symptom[getData2().symptom[s1.where][s2][0]]}
                                    </Text>
                                </Item>
                                <Item
                                    style={{marginLeft: 0, paddingLeft: 18, paddingTop: 4, paddingBottom: 4}}
                                >
                                    <Text style={{textAlign: 'right', width: '100%', paddingRight: 18}}>
                                        {this.state.language.symptom[getData2().symptom[s1.where][s2][0]]}
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
                        {korLanguage.howLong[global.howLong]}정도 아팠어요
                    </Text>
                </ListItem>
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
