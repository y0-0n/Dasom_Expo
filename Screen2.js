import React from 'react';
import { StyleSheet, TextInput, Image, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import {Button, Text, Icon, Body, Toast, Content, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData} from './getData.js';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Screen2 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false
        }

        global.object = {
            symptom: this.props.symptom == undefined ? {
            } : this.props.symptom
        };
    }
    componentWillMount() {
        getLanguage(AsyncStorage).then((key) => {
            this.setState({
                language: getData(key),
                loaded: true
            });
        });
    }

    componentDidMount() {
    }

    render() {
        const goToHead = () => Actions.part({part: "head", symptom: global.object.symptom});
        const goToStomach = () => Actions.symptom({where: "stomach", symptom: global.object.symptom});
        const goToThroatChest = () => Actions.part({part: "throatchest", symptom: global.object.symptom});
        const goToArmLeg = () => Actions.part({part: "armleg", symptom: global.object.symptom});
        const goToBottom = () => Actions.symptom({where: "bottom", symptom: global.object.symptom});
        const goToSkin = () => Actions.symptom({where: "skin", symptom: global.object.symptom});
 
        const toast = () => Toast.show({
            text: this.state.language.screen2help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });

        return this.state.loaded? (
            <View style={{flex: 1}}>
                <ScrollView>
                    <Image source={require('./img/body.png')} style={{resizeMode: 'stretch', width:'100%'}} />

                    <TouchableOpacity
                        style={{position: 'absolute', width: "50%", height: 350}}>
                        <Text style={styles.leftText}> </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToSkin}
                        style={{position: 'absolute', width: "50%", height: 350, top: 90}}>
                        <Text style={styles.leftText}> {this.state.language.screen2[0]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{position: 'absolute', width: "50%", height: 160, top: 440}}>
                        <Text style={styles.leftText}> {this.state.language.screen2[1]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToHead}
                        style={{position: 'absolute', width: "50%", height: 90, left: '50%'}}>
                        <Text style={styles.rightText}> {this.state.language.screen2[2]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToThroatChest}
                        style={{position: 'absolute', width: "50%", height: 85, top: 90, left: "50%"}}>
                        <Text style={styles.rightText}> {this.state.language.screen2[3]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToStomach}
                        style={{position: 'absolute', width: "50%", height: 80, top: 175, left: "50%"}}>
                        <Text style={styles.rightText}> {this.state.language.screen2[4]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToBottom}
                        style={{position: 'absolute', width: "50%", height: 80, top: 255, left: "50%"}}>
                        <Text style={styles.rightText}> {this.state.language.screen2[5]} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToArmLeg}
                        style={{position: 'absolute', width: "50%", height: 265, top: 335, left: "50%"}}>
                        <Text style={styles.rightText}> {this.state.language.screen2[6]} </Text>
                    </TouchableOpacity>
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
                        IconComponent= {Icon}
                        iconName = 'help'
                        onPress={toast}
                    />
                    <BottomToolbar.Action
                        title=''
                    />
                </BottomToolbar>
            </View>
    ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
        <Spinner />
    </View>)
  }
}

const styles = StyleSheet.create({
    leftText: {
        paddingLeft: 20,
        width: "50%",
        marginTop: 20,
        fontSize: 19,
        color: 'gray'
    },
    rightText: {
        paddingRight: 20,
        marginTop: 20,
        left: "50%",
        width: "50%",
        fontSize: 19,
        textAlign: 'right',
        color: 'gray'
    }
});
