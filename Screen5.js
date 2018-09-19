import React from 'react';
import { StyleSheet, ScrollView, Platform, Linking, Alert } from 'react-native';
import { Icon, Button, Text,  View, ListItem, Item, Toast, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen5 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true,
        }
    }

    render() {
        let where = this.props.where;
        let korLanguage = getData('ko');
        let array2 = Object.values(global.object.symptom);
        var department;
        const toast = () => Toast.show({
            text: global.language.screen5help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });

        if(this.state.loaded) {
            departments = new Array(global.language.department.length);
            global.language.department.map((key, i) => {
                departments[i] = {name: global.language.department[i], index: 0, search: korLanguage.department[i]}
            });
        }
        var sum = 0;
        return this.state.loaded? (
            <View style={{flex: 1}}>
                <ScrollView>
                    {array2.map((s1, i1) => {
                        let array3 = s1.array;
                            {array3.map((s2,i2) => {
                                let department;
                                for (i in getData2().symptom[s1.where]) {
                                    if(getData2().symptom[s1.where][i][0] == s2) {
                                        department = getData2().symptom[s1.where][i][1]
                                    }
                                }
                                department.map((s3, i3) => {//진료과 Counting
                                    sum++;
                                    departments[s3]["index"]++;

                                })
                            })}
                    })}

                    {//sort
                        departments.sort(function(a, b) {
                           return b["index"] - a["index"]
                        }).map((a, b) => null)
                    }
                    {departments.map((item, i) => {
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
