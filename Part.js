import React from 'react';
import { Toast, Content, Text, ListItem, Icon, Spinner, View, Button } from 'native-base';
import { AsyncStorage, ScrollView, StyleSheet, Image, TouchableHighlight } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {getData, getImage} from './getData.js';
import {getData2} from './getData2.js';
import {getLanguage} from './AsyncStorage';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class Part extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: true
        }

    }

    render() {
        var arrayKey;
        var engLanguage = getData('en'); 
        const toast = () => Toast.show({
            text: global.language.screen2help,
            position: "bottom",
            buttonText: "quit",
            duration: 3000
        });
        
        if(this.state.loaded) {
            arrayKey = getData2()[this.props.part];
            arrayKey.sort();
        }
        return this.state.loaded? (
                <View style={{flex: 1}}>
                    <ScrollView>
                    <View style={styles.container}>
                      {arrayKey.map( (s,i) => {
                          return <View
                              key={i}
                              style={styles.button}
                              onPress={() => Actions.symptom({
                                  where: arrayKey[i],
                                  symptom: this.props.symptom
                              })}
                          >
                            <TouchableHighlight
                              onPress={() => Actions.symptom({
                                  where: arrayKey[i],
                                  symptom: this.props.symptom
                              })}
                            >
                              <Image
                                source={getImage(engLanguage.part[s])}
                                style={styles.image}
                              />
                            </TouchableHighlight>
                            <Text
                              style={styles.text}
                              onPress={() => Actions.symptom({
                                  where: arrayKey[i],
                                  symptom: this.props.symptom
                              })}
                            > {global.language.part[s]} </Text>
                          </View>
                      })}
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
  container: {
    justifyContent: 'center',
    alignItems: 'center', 
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center', 
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 10
  },
  text: {
    textAlign: 'center',
  },
  image: {
  }
});
