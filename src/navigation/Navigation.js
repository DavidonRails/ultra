import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {StyleSheet, View, Platform} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AsyncStorage} from 'react-native';
import LoginContainer from './../containers/LoginContainer';
import SignupContainer from './../containers/SignupContainer';
import NewPasswordContainer from './../containers/NewPasswordContainer';
import DigitCodeContainer from './../containers/DigitCodeContainer';
import ResetPasswordContainer from './../containers/ResetPasswordContainer';
import CalendarIco from './../assets/icons/Calendar';
import ChatIco from './../assets/icons/Chat';
import ProfileIco from './../assets/icons/Profile';
import MatchIco from './../assets/icons/Match';
import ProfileContainer from './../containers/ProfileContainer';
import SettingsContainer from './../containers/SettingsContainer';
import ChangePasswordContainer from './../containers/ChangePasswordContainer';
import ChangeGeoContainer from './../containers/ChangeGeoContainer';
import ManageSubContainer from './../containers/ManageSubContainer';
import DeleteUserContainer from './../containers/DeleteUserContainer';
import CalendarContainer from './../containers/CalendarContainer';
import MatchContainer from './../containers/MatchContainer';
import DateRatingContainer from './../containers/DateRatingContainer';
import MyAvailableContainer from './../containers/MyAvailableContainer';
import PickMatchDateContainer from './../containers/PickMatchDateContainer';
import ChatContainer from './../containers/ChatContainer';
import ChatRoomContainer from './../containers/ChatRoomContainer';
import MatchPreferencesContainer from './../components/MatchPreferences/MatchPreferencesContainer';
import ChangeMyAnswerContainer from './../containers/ChangeMyAnswerContainer';
import Faq from './../components/Settings/Faq';
import MyAnswersContainer from './../containers/MyAnswersContainer';
import EditProfileСontainer from './../containers/EditProfileСontainer';
import ReportsContainer from './../containers/ReportsContainer';
import TermsOfConditions from './../components/TermsOfConditions/TermsOfConditions';
import RefferalLinkContainer from './../containers/ReferalLinkContainer';
import EditProfile from '../components/Profile/EditProfile';
import HostsContainer from '../components/Hosts/HostsContainer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {navigationRef} from './RootNavigation';

const SignUpStack = createStackNavigator();
const AppStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const MatchStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default Navigation = (props) => {
  useEffect(() => {
    AsyncStorage.getItem('userToken').then((data) => {
      data !== null ? props.setIsLogin(true) : null;
      data !== null ? props.setProfileCompleteHandler() : null;
      data !== null ? props.setUserStatisticHandler() : null;
    });
    AsyncStorage.getItem('guide').then((data) => {
      data !== null ? props.setGuidelines(false) : null;
    });
  });
  function ProfileStackScreen() {
    return (
      <ProfileStack.Navigator
        initialRouteName="Profile"
        screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name="Profile" component={ProfileContainer} />
        <ProfileStack.Screen name="Edit" component={EditProfile} />
      </ProfileStack.Navigator>
    );
  }

  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator
        initialRouteName="Settings"
        screenOptions={{headerShown: false}}>
        <SettingsStack.Screen name="Settings" component={SettingsContainer} />
        <SettingsStack.Screen name="FAQ" component={Faq} />
        <SettingsStack.Screen
          name="ChangePassword"
          component={ChangePasswordContainer}
        />
        <SettingsStack.Screen
          name="DeleteUser"
          component={DeleteUserContainer}
        />
         <SettingsStack.Screen
          name="RefferalLink"
          component={RefferalLinkContainer}
        />
      </SettingsStack.Navigator>
    );
  }

  function ChatStackScreen() {
    return (
      <ChatStack.Navigator
        initialRouteName="Chat"
        screenOptions={{headerShown: false}}>
        <SettingsStack.Screen name="Chat" component={ChatContainer} />
        <SettingsStack.Screen name="ChatRoom" component={ChatRoomContainer} />
      </ChatStack.Navigator>
    );
  }

  function MatchStackScreen() {
    return (
      <MatchStack.Navigator
        initialRouteName="Match"
        screenOptions={{headerShown: false}}>
        <MatchStack.Screen name="Match" component={MatchContainer} />
      </MatchStack.Navigator>
    );
  }

  function CalendarStackScreen() {
    return (
      <CalendarStack.Navigator
        initialRouteName="Calendar"
        screenOptions={{headerShown: false}}>
        <CalendarStack.Screen name="Calendar" component={CalendarContainer} />
        <CalendarStack.Screen
          name="MyAvailable"
          component={MyAvailableContainer}
        />
      </CalendarStack.Navigator>
    );
  }

  function AppTabs() {
    return (
      <Tab.Navigator
        barStyle={{backgroundColor: '#fff'}}
        initialRouteName="Profile"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Profile') {
              return (
                <View
                  style={[
                    styles.icoBlock,
                    {backgroundColor: focused ? '#F0F0F0' : null},
                  ]}>
                  <ProfileIco width={35} height={35} fill={'#5E5E5E'} />
                </View>
              );
            } else if (route.name === 'Chat') {
              return (
                <View
                  style={[
                    styles.icoBlock,
                    {backgroundColor: focused ? '#F0F0F0' : null},
                  ]}>
                  <ChatIco width={35} height={35} fill={'#5E5E5E'} />
                </View>
              );
            } else if (route.name === 'Match') {
              return (
                <View
                  style={[
                    styles.icoBlock,
                    {backgroundColor: focused ? '#F0F0F0' : null},
                  ]}>
                  <MatchIco width={35} height={35} fill={'#5E5E5E'} />
                </View>
              );
            } else if (route.name === 'Calendar') {
              return (
                <View
                  style={[
                    styles.icoBlock,
                    {backgroundColor: focused ? '#F0F0F0' : null},
                  ]}>
                  <CalendarIco width={35} height={35} fill={'#5E5E5E'} />
                </View>
              );
            }
          },
        })}
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: '#FAFAFA',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            borderWidth: 0,
            height: Platform.OS === 'ios' ? hp(11) : hp(10),
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingHorizontal: 10,
            display: props.guidelines ? 'none' : null,
          },
          tabStyle: {
            borderWidth: 0,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
          labelStyle: {
            backgroundColor: 'white',
            borderWidth: 0,
            marginLeft: 0,
          },
        }}>
        <Tab.Screen name="Calendar" component={CalendarStackScreen} />
        <Tab.Screen name="Match" component={MatchStackScreen} />
        <Tab.Screen name="Chat" component={ChatStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
      </Tab.Navigator>
    );
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
    },
  };

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {!props.isLogin ? (
        <>
          <SignUpStack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}>
            <SignUpStack.Screen name="Login" component={LoginContainer} />
            <SignUpStack.Screen name="SignUp" component={SignupContainer} />
            <SignUpStack.Screen
              name="NewPassword"
              component={NewPasswordContainer}
            />
            <SignUpStack.Screen
              name="DigitCode"
              component={DigitCodeContainer}
            />
            <SignUpStack.Screen
              name="ResetPassword"
              component={ResetPasswordContainer}
            />
            <SignUpStack.Screen name="Terms" component={TermsOfConditions} />
          </SignUpStack.Navigator>
        </>
      ) : (
        <>
          <AppStack.Navigator
            initialRouteName="App"
            screenOptions={{headerShown: false}}>
            <AppStack.Screen name="App" component={AppTabs} />
            <AppStack.Screen name="Settings" component={SettingsStackScreen} />
            <AppStack.Screen name="Place" component={HostsContainer} />
            <AppStack.Screen
              name="DateRating"
              component={DateRatingContainer}
            />
            <AppStack.Screen name="ChangeGeo" component={ChangeGeoContainer} />
            <AppStack.Screen
              name="ChangeMyAnswers"
              component={ChangeMyAnswerContainer}
            />
            <AppStack.Screen
              name="PickMatchDate"
              component={PickMatchDateContainer}
            />
            <AppStack.Screen name="MyAnswers" component={MyAnswersContainer} />
            <AppStack.Screen
              name="EditProfile"
              component={EditProfileСontainer}
            />
            <AppStack.Screen name="Reports" component={ReportsContainer} />
            <AppStack.Screen name="ManageSub" component={ManageSubContainer} />
            <AppStack.Screen name="Terms" component={TermsOfConditions} />
            <AppStack.Screen
              name="MatchPreferences"
              component={MatchPreferencesContainer}
            />
          </AppStack.Navigator>
        </>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

let styles = StyleSheet.create({
  icoBlock: {
    borderRadius: 17,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#707070',
    zIndex: -1000,
  },
});
