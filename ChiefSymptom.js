import React from 'react';
import { Toast, ListItem, Text, Content, Spinner, View, Item, Icon} from 'native-base';
import { ScrollView, AsyncStorage } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import {getData} from './getData';
import {getData2} from './getData2.js';
import {getLanguage} from './AsyncStorage.js';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class ChiefSymptom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            selected: null
        };
    }
    componentDidMount() {
    }

    componentWillMount() {
    }

    render() {
        const goToScreen4 = () => Actions.screen4();
        const toast = () => Toast.show({
            text: global.language.chiefSymptom,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        let array = Object.values(global.object.symptom);
        return this.state.loaded? (<View style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <ListItem 
                    style={{marginLeft: 0, paddingLeft: 18}}
                >
                    <Text> {global.language.chiefSymptom} </Text>
                </ListItem>
                {array.map((s1, i1)=> {
                    array2 = s1.array;
                    return <View key={i1}>
                        <Item style={{marginLeft: 0, paddingLeft: 18, paddingTop: 5, paddingBottom: 5}}>
                            <Text> {global.language.part[s1.where]} </Text>
                        </Item>
                        {array2.map((s2, i2) => {
                            return <ListItem key={i2}
                                style={{marginLeft: 0, paddingLeft: 18}}
                                onPress={() => {
                                    this.setState({selected: s2});
                                    global.object.chiefSymptom = {where: s1.where, symptom: s2};
                                }}
                            >
                                <CheckBox
                                    checked = {s2==this.state.selected}
                                    label = {global.language.symptom[s2]}
                                    onChange={() => {
                                        this.setState({selected: s2});
                                        global.object.chiefSymptom = {where: s1.where, symptom: s2};
                                    }}
                                />
                            </ListItem>
                        })}
                    </View>
                })}
            </ScrollView>
            <BottomToolbar>
                <BottomToolbar.Action
                    title=''
                    onPress={() => Actions.pop()}
                    IconComponent= {Icon}
                    iconName = 'arrow-back'
                />
                <BottomToolbar.Action
                    title=''
                    onPress={toast}
                    IconComponent= {Icon}
                    iconName = 'help'
                />
                <BottomToolbar.Action
                    disabled={this.state.selected == null}
                    title=''
                    onPress={() => goToScreen4()}
                    IconComponent= {Icon}
                    iconName = 'arrow-forward'
                />
            </BottomToolbar>
        </View>) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)

    }
}
