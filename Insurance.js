import React from 'react';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { Icon, Spinner, Content, Text} from 'native-base';
import {getData} from './getData';
import {Actions} from 'react-native-router-flux';
import ToggleBox from 'react-native-togglebox';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Insurance extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true
        };
    }

    render() {
        return this.state.loaded? (
        <View style={{flex: 1}}>
            <ScrollView>
                 <ToggleBox label={global.language.insurance[0]} style={{backgroundColor: 'white', borderBottomWidth: 0.5}}>
                    <View style={{padding: 30, alignItems: 'center', backgroundColor: '#eee'}}>
                        <View>
                            <Text>{global.language.insurance[1]}</Text>
                        </View>
                        <Image source={require('./img/insurance/img1.png')}
                            style={{width: "90%", resizeMode: "stretch"}} />
                        <View style={{marginTop: 10, marginBottom: 5}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{global.language.insurance[2]}</Text>
                        </View>
                        <View>
                            <Text>1. {global.language.insurance[3]}</Text>
                        </View>
                        <View>
                            <Text>2. {global.language.insurance[4]}</Text>
                        </View>
                        <View>
                            <Text>3. {global.language.insurance[5]}</Text>
                        </View>
                     </View>
                 </ToggleBox>
                 <ToggleBox label={global.language.insurance[6]} style={{backgroundColor: 'white', borderBottomWidth: 0.5}}>
                    <View style={{padding: 10, alignItems: 'center', backgroundColor: '#eee'}}>
                        <View>
                            <Text>{global.language.insurance[7]}</Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{global.language.insurance[8]}</Text>
                        </View>
                        <View>
                            <Text>1. {global.language.insurance[9]}</Text>
                        </View>
                        <View>
                            <Text>2. {global.language.insurance[10]}</Text>
                        </View>
                        <View>
                            <Text>3. {global.language.insurance[11]}</Text>
                        </View>
                        <View>
                            <Text>4. {global.language.insurance[12]}</Text>
                        </View>
                     </View>
                 </ToggleBox>
                 <ToggleBox label={global.language.insurance[13]} style={{backgroundColor: 'white', borderBottomWidth: 0.5}}>
                     <View style={{padding: 10, alignItems: 'center', backgroundColor: '#eee'}}>
                        <View>
                            <Text>{global.language.insurance[14]}</Text>
                        </View>
                        <Image source={require('./img/insurance/img2.png')}
                            style={{width: "100%", resizeMode: "stretch"}} />
                        <View>
                            <Text>1. {global.language.insurance[15]}</Text>
                        </View>
                        <View>
                            <Text>2. {global.language.insurance[16]}</Text>
                        </View>
                        <View>
                            <Text>3. {global.language.insurance[17]}</Text>
                        </View>
                     </View>
                 </ToggleBox>
                 <ToggleBox label={global.language.insurance[18]} style={{backgroundColor: 'white', borderBottomWidth: 0.5}}>
                     <View style={{padding: 10, alignItems: 'center', backgroundColor: '#eee'}}>
                        <View>
                            <Text>{global.language.insurance[19]}</Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{global.language.insurance[20]}</Text>
                        </View>
                        <View>
                            <Text>1. {global.language.insurance[21]}</Text>
                        </View>
                        <View>
                            <Text>2. {global.language.insurance[22]}</Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{global.language.insurance[23]}</Text>
                        </View>
                        <View>
                            <Text>{global.language.insurance[24]}</Text>
                        </View>
                        <View style={{marginTop: 10, marginBottom: 5}}>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{global.language.insurance[25]}</Text>
                        </View>
                        <View>
                            <Text>{global.language.insurance[26]}</Text>
                        </View>
                     </View>
                 </ToggleBox>
            </ScrollView>
            <BottomToolbar>
                <BottomToolbar.Action
                    title=''
                    onPress={() => Actions.pop()}
                    IconComponent= {Icon}
                    iconName = 'arrow-back'
                />
            </BottomToolbar>
        </View>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}
