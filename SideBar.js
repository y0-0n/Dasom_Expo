import Drawer from 'react-native-drawer'
import React from 'react';
import { StyleSheet, Image, AsyncStorage, ScrollView } from 'react-native';
import { View, ListItem, Text, Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getData } from './getData';
import { getLanguage } from './AsyncStorage';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        }
    }

    componentWillMount() {
        getLanguage(AsyncStorage).then((key) => {
            if(key == null) {
                this.setState({
                    language: getData('en'),
                    loaded: true
                })
            } else {
                this.setState({
                    language: getData(key),
                    loaded: true
                });
            }
        });
    }

    render() {
        return this.state.loaded? (<ScrollView>
            <View style={{paddingTop: this.props.topMargin}}>
                <Image source={require('./img/sidebar.gif')} style={{height: 200, width: "100%"}} />
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.screen1()}}>
                    <Text>{this.state.language.sideBar.home}</Text>
                </ListItem>
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.language()}}>
                    <Text>{this.state.language.sideBar.language}</Text>
                </ListItem>
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.insurance()}}>
                    <Text>{this.state.language.sideBar.insurance}</Text>
                </ListItem>
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.list()}}>
                    <Text>{this.state.language.sideBar.list}</Text>
                </ListItem>
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.mapSelect()}}>
                    <Text>{this.state.language.sideBar.map}</Text>
                </ListItem>
                <ListItem style={styles.listitem} onPress={() => {this.props.closeDrawer();Actions.screen1()}}>
                    <Text>{this.state.language.sideBar.people}</Text>
                </ListItem>
            </View>
        </ScrollView>
        ) : (<View style={{height: "100%", alignItems: 'center', justifyContent: 'center'}}>
          <Spinner />
        </View>)
      }
}

const styles = StyleSheet.create({
    listitem: {
        marginLeft: 0, paddingLeft: 18
    }
});
