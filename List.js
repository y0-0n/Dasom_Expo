import React from 'react';
import { Alert, AsyncStorage, StyleSheet, View, Image, Text, ScrollView, Switch } from 'react-native';
import { Icon, Spinner, ListItem, Item, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {getData, getImage} from './getData.js';
import {getData2} from './getData2.js';
import {load, getLanguage} from './AsyncStorage.js';
import BottomToolbar from 'react-native-bottom-toolbar';

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            empty: false,
            translated: false
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
    toggleSwitch(value) {
      this.setState({translated: value});
    }
    render() {
        let korLanguage = getData('ko');
        let engLanguage = getData('en');
        return this.state.loaded? (<View style={{flex: 1}}>
            <ScrollView>
              <Switch
                value={this.state.translated}
                onValueChange={(value)=>{this.toggleSwitch(value);}}
              />
              <View style={styles.list} >
                <View style={[styles.center, styles.marginTB]}>
                  <Text style={{fontSize: 18}}>
                    {this.state.translated ? korLanguage.listChiefSymptom : global.language.listChiefSymptom}
                  </Text>
                </View>
                <View style={[styles.center, {flexDirection: 'row'}]}>
                    <Image
                      source={getImage(engLanguage.part[global.chiefSymptom.where])}
                    />
                    <Text style={{paddingRight: 18, fontSize: 22}}>
                      {this.state.translated ? korLanguage.part[global.chiefSymptom.where]: global.language.part[global.chiefSymptom.where]}{"\n"}
                      -> {this.state.translated ? korLanguage.symptom[global.chiefSymptom.symptom]: global.language.symptom[global.chiefSymptom.symptom]}
                    </Text>
                </View>
              </View>
              <View style={styles.list} >
                {global.array.map((s1, i1) => {
                    let array3 = s1.array;
                    return <View key={i1} style={{borderBottomWidth: 0.3}}>
                        <View style={styles.title}>
                          <Image
                            source={getImage(engLanguage.part[s1.where])}
                            style={styles.image}
                          />
                          <Text style={{fontSize: 22}}>
                              {this.state.translated ? korLanguage.part[s1.where]: global.language.part[s1.where]}
                              에 문제가 있어요
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text> {/*상세*/} </Text>
                            </View>
                            <View style={{flex: 7}}>
                        {array3.map((s2,i2) => {
                            return <View key={i2}>
                                <View
                                    style={{marginLeft: 0, paddingLeft: 18, paddingTop: 5, paddingBottom: 5}}
                                >
                                    <Text style={{fontSize: 22}}>
                                        - {this.state.translated? korLanguage.symptom[s2]: global.language.symptom[s2]}
                                    </Text>
                                </View>
                            </View>
                        })}
                            </View>
                        </View>
                    </View>
                })}
              </View>
              <View style={styles.list} >
                <View style={[styles.center, styles.marginTB]}>
                  <Text style={{fontSize: 22}}>
                    Q&A
                  </Text>
                </View>
                <View style={[styles.question, styles.center]}>
                  <Text style={styles.qtxt}>
                      {this.state.translated ? korLanguage.question1: global.language.question1}
                  </Text>
                </View>
                <View style={[styles.answer, styles.center]}>
                  <Text style={styles.atxt}>
                      {this.state.translated ? korLanguage.answer1[global.answer1[0]]: global.language.answer1[global.answer1[0]]}
                  </Text>
                </View>
                {global.answer1[1]!='key0'? <View>
                  <View style={[styles.question, styles.center]}>
                    <Text style={styles.qtxt}>
                        {this.state.translated ? korLanguage.question2: global.language.question2}
                    </Text>
                  </View>
                  <View style={[styles.answer, styles.center]}>
                    <Text style={styles.atxt}>
                        {this.state.translated ? korLanguage.answer2[global.answer1[1]]: global.language.answer2[global.answer1[1]]}
                    </Text>
                  </View>
                </View> : null}
                {global.answer1[2]!='key0'? <View>
                  <View style={[styles.question, styles.center]}>
                    <Text style={styles.qtxt}>
                        {this.state.translated ? korLanguage.question3: global.language.question3}
                    </Text>
                  </View>
                  <View style={[styles.answer, styles.center]}>
                    <Text style={styles.atxt}>
                        {this.state.translated ? korLanguage.answer3[global.answer1[2]]: global.language.answer3[global.answer1[2]]}
                    </Text>
                  </View>
                </View> : null}
                {global.answer1[3]!='key0'? <View>
                  <View style={[styles.question, styles.center]}>
                    <Text style={styles.qtxt}>
                        {this.state.translated ? korLanguage.question4: global.language.question4}
                    </Text>
                  </View>
                  <View style={[styles.answer, styles.center]}>
                    <Text style={styles.atxt}>
                        {this.state.translated ? korLanguage.answer4[global.answer1[3]]: global.language.answer4[global.answer1[3]]}
                    </Text>
                  </View>
                </View> : null}
                <View style={[styles.question, styles.center]}>
                  <Text style={styles.qtxt}>
                      {this.state.translated ? korLanguage.question5: global.language.question5}
                  </Text>
                </View>
                <View style={[styles.answer, styles.center]}>
                  <Text style={styles.atxt}>
                      {this.state.translated ? korLanguage.answer5[global.answer1[4]]: global.language.answer5[global.answer1[4]]}
                  </Text>
                </View>
                {global.answer2.length!=0 ? <View style={[styles.question, styles.center]}>
                    <Text style={styles.qtxt}>
                        {this.state.translated ? korLanguage.question6: global.language.question6}
                    </Text>
                </View> : null
                }
                {global.answer2.map((s, i) => {
                  return <View key={i} style={[styles.answer, styles.center]}>
                    <Text style={styles.atxt}>
                        {this.state.translated ? korLanguage.answer6[global.answer1[5]]: global.language.answer6[global.answer1[5]]}
                    </Text>
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
            </BottomToolbar>
        </View>) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Spinner />
        </View>)
    }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTB: {
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    flexDirection: 'row',
  },
  image: {
    height: 50,
  },
  question: {
    backgroundColor: 'skyblue',
    paddingLeft: 18,
    marginLeft: 0,
    height: 50,
  },
  answer: {
    paddingLeft: 18,
    marginLeft: 0,
    height: 50,
  },
  qtxt: {
    fontSize: 18,
    color: 'white'
  },
  atxt: {
    fontSize: 18,
    width: '100%',
    //textAlign: 'right',
    paddingRight: 10
  }
});
