import React, { Component } from 'react';
import { 
StyleSheet, 
Text, 
Image,
TouchableOpacity, 
View
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './main/Main';
import Profile from './main/Profile';
import Calendar from './main/Calendar';
import Search from './main/Search';
import Store from './main/Store';

const Tab = createBottomTabNavigator();

const TabBarButton = ({children, onPress}) => (
    <TouchableOpacity
    style={{
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
        //...styles.shadow
    }}
    onPress={onPress}
    >
        <View style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

export class Mainstack extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        const { currentUser } = this.props;
        return (
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style: {
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        elevation: 0,
                        backgroundColor: 'rgba(233,127,87,1)',
                        borderRadius: 15,
                        height: 70,
                        ...styles.shadow
                    }
                }}
                >
                <Tab.Screen name="Main" component={Main} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Entypo name="home" size={24} color="#fff" resizeMode='contain' 
                            style ={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                            />
                        </View>
                    )
                }} />
                <Tab.Screen name="Search" component={Search} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <FontAwesome name="search" size={24} color="#fff" resizeMode='contain' 
                            style ={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                            />
                        </View>
                    )
                }} />
                <Tab.Screen name="Calendar" component={Calendar} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome name="calendar" size={30} color="#fff" resizeMode="contain"/>
                    ),
                    tabBarButton: (props) => (
                        <TabBarButton {... props} />
                    )
                }} />
                <Tab.Screen name="Store" component={Store} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <MaterialIcons name="local-grocery-store" size={24} color="#fff" resizeMode='contain' 
                            style ={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                            />
                        </View>
                    )
                }} />
                <Tab.Screen name="Profile" component={Profile} 
                options={{
                    tabBarIcon: ({focused}) => (
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Ionicons name='person-circle' size={24} color="#fff" resizeMode='contain' 
                            style ={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#e32f45' : '#748c94',
                            }}
                            />
                        </View>
                    )
                }} />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#121212',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 20,

    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Mainstack);
