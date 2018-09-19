import React from 'react';
import { ScrollView } from 'react-native';
import { Content, Text, ListItem, Item, Icon, Body, View, Button, Spinner, Toast } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getData2} from './getData2.js';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen3 extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: true
        }
    }

    render() {
        //const goToScreen4 = () => Actions.screen4(global.object);
        const goToChiefSymptom = () => Actions.chiefSymptom();
        const goToScreen2 = () => {
            Actions.screen2(global.object);
        }
        const toast = () => Toast.show({
            text: global.language.screen3help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        let korLanguage = getData('ko');
        let array2 = Object.values(global.object.symptom);
        return this.state.loaded? (
            <View style={{flex: 1}}>
                <ScrollView>
                    {array2.map((s1, i1) => {
                        let array3 = s1.array;
                        return <View key={i1}>
                            <ListItem style={{paddingLeft: 18, marginLeft: 0}}>
                                <Text style={{position: "absolute", textAlign: 'right', width:"100%", fontSize: 25}}>
                                    {global.language.part[s1.where]}
                                </Text>
                                <Text style={{fontSize: 25}}>
                                    {korLanguage.part[s1.where]}
                                </Text>
                            </ListItem>
                            {array3.map((s2,i2) => {
                                ar = getData2().symptom[s1.where]
                                return <View key={i2}>
                                    <Item
                                        style={{marginLeft: 0, paddingLeft: 18, paddingTop: 5, paddingBottom: 5}}
                                    >
                                        <Text style={{fontSize: 22}}>
                                            {
                                                //korLanguage.symptom[ar[s2][0]]
                                                korLanguage.symptom[s2]
                                            }
                                        </Text>
                                    </Item>
                                    <Item
                                        style={{marginLeft: 0, paddingLeft: 18, paddingTop: 4, paddingBottom: 4}}
                                    >
                                        <Text style={{textAlign: 'right', width: '100%', paddingRight: 18}}>
                                            {
                                                global.language.symptom[s2]
                                            }
                                        </Text>
                                    </Item>
                                </View>
                            })}
                        </View>
                    })}
                </ScrollView>
                <BottomToolbar>
                    <BottomToolbar.Action
                        title=""
                        onPress={() => goToScreen2()}
                        IconComponent= {Icon}
                        iconName = 'arrow-back'
                    />
                    <BottomToolbar.Action
                        title=""
                        IconComponent= {Icon}
                        iconName = 'help'
                        onPress={toast}
                    />
                    <BottomToolbar.Action
                        title=''
                        onPress={() => goToChiefSymptom()}
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
