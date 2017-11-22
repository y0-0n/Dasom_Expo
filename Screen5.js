import React from 'react';
import { StyleSheet, AsyncStorage, ScrollView, Platform, Linking, Alert } from 'react-native';
import { Icon, Button, Text,  View, ListItem, Item, Toast, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen5 extends React.Component {
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

        global.object = {
            symptom: this.props.symptom == undefined ? {
            } : this.props.symptom,
        };
    }

    render() {
        let where = this.props.where;
        let korLanguage = getData('ko');
        let array2 = Object.values(global.object.symptom);
        var department;
        const toast = () => Toast.show({
            text: this.state.language.screen5help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });

        if(this.state.loaded) {
            department = [
                {name: this.state.language.department[0], index: 0, search: korLanguage.department[0]},
                {name: this.state.language.department[1], index: 0, search: korLanguage.department[1]},
                {name: this.state.language.department[2], index: 0, search: korLanguage.department[2]},
                {name: this.state.language.department[3], index: 0, search: korLanguage.department[3]},
                {name: this.state.language.department[4], index: 0, search: korLanguage.department[4]},
                {name: this.state.language.department[5], index: 0, search: korLanguage.department[5]},
                {name: this.state.language.department[6], index: 0, search: korLanguage.department[6]},
                {name: this.state.language.department[7], index: 0, search: korLanguage.department[7]},
                {name: this.state.language.department[8], index: 0, search: korLanguage.department[8]},
            ];
        }
        var sum = 0;
        return this.state.loaded? (
            <View style={{flex: 1}}>
                <ScrollView>
                    {array2.map((s1, i1) => {
                        let array3 = s1.array;
                        /*return <View key={i1}>
                            <ListItem style={{paddingLeft: 18, marginLeft: 0}}>
                                <Text style={{fontSize: 25}}>
                                    {s1.whereKor}
                                </Text>
                                <Text style={{position: "absolute", textAlign: 'right', width:"100%", fontSize: 25}}>
                                    {s1.whereLanguage}
                                </Text>
                            </ListItem>*/
                            {array3.map((s2,i2) => {
                                getData2().symptom[s1.where][s2][1].map((s3, i3) => {
                                    sum++;
                                    switch(s3) {
                                        case 0:
                                            department[0]["index"]++;
                                            break;
                                        case 1:
                                            department[1]["index"]++;
                                            break;
                                        case 2:
                                            department[2]["index"]++;
                                            break;
                                        case 3:
                                            department[3]["index"]++;
                                            break;
                                        case 4:
                                            department[4]["index"]++;
                                            break;
                                        case 5:
                                            department[5]["index"]++;
                                            break;
                                        case 6:
                                            department[6]["index"]++;
                                            break;
                                        case 7:
                                            department[7]["index"]++;
                                            break;
                                        case 8:
                                            department[8]["index"]++;
                                            break;
                                    }
                                })
                                /*return <View key={i2}>
                                    <Item
                                        style={{marginLeft: 0, paddingLeft: 18}}
                                    >
                                        <Text style={{fontSize: 22}}>
                                            {korLanguage.symptom[s1.where][s2][1]}
                                        </Text>
                                    </Item>
                                    <Item
                                        style={{marginLeft: 0, paddingLeft: 18}}
                                    >
                                        <Text style={{textAlign: 'right', width: '100%', paddingRight: 18}}>
                                            {this.state.language.symptom[s1.where][s2][1]}
                                        </Text>
                                    </Item>
                                </View>*/
                            })}
                        //</View>
                    })}
                    {//sort
                        department.sort(function(a, b) {
                           return b["index"] - a["index"]
                        }).map((a, b) => null)
                    }
                    {department.map((item, i) => {
                        return item["index"]?<ListItem 
                            key={i}
                            style={{paddingLeft: 18, marginLeft: 0}}
                            onPress={() => Linking.openURL('https://www.google.com/maps/search/'+item['search']+'/My+Location')}
                        >
                            <Text style={{width: "50%"}}> {item["name"]} </Text>
                            <AnimatedCircularProgress
                                size={120}
                                width={15}
                                rotation={0}
                                fill={Math.round(item["index"]/sum*100)}
                                tintColor="#00e0ff"
                                backgroundColor="#3d5875"
                                style={{marginLeft: "5%"}}
                            >
                                {() => (<Text> {Math.round(item["index"]/sum*100)}% </Text>)}
                            </AnimatedCircularProgress>
                        </ListItem>: null}
                   )}
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

const styles = StyleSheet.create({
});
