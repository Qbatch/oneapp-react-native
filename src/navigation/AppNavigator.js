import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';

import List from '../screens/search/List';
import Detail from '../screens/search/Detail';
import History from '../screens/history/History';
import Scan from '../screens/scan/Scan';
import BuyList from '../screens/buy-list/BuyList';
import Settings from '../screens/settings/Settings';
import Login from '../screens/auth/Login';
import AuthLoading from '../screens/auth/AuthLoading';

const SearchTab = createStackNavigator({
  SearchProducts: {
    screen: List,
    navigationOptions: {
      title: 'Search Products'
    },
  },
  ProductDetail: {
    screen: Detail,
    navigationOptions: {
      title: 'Product',
    },
  }
});

const HistoryTab = createStackNavigator({
  History: {
    screen: History,
    navigationOptions: {
      title: 'Search History',
    },
  }
});

const ScanTab = createStackNavigator({
  Scan: {
    screen: Scan,
    navigationOptions: {
      title: 'Scan Barcode',
    },
  }
});

const BuyListTab = createStackNavigator({
  BuyList: {
    screen: BuyList,
    navigationOptions: {
      title: 'BuyList',
    },
  }
});

const SettingsTab = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    }
  },

});

const AppNavigator = createBottomTabNavigator({
  SearchTab: {
    screen: SearchTab,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: <Image source={require('../assets/images/search.png')} />
    },
  },
  HistoryTab: {
    screen: HistoryTab,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: <Image source={require('../assets/images/history.png')} />
    }
  },
  ScanTab: {
    screen: ScanTab,
    navigationOptions: {
      tabBarLabel: 'Scan',
      tabBarIcon: <Image source={require('../assets/images/barcode.png')} />
    }
  },
  BuyListTab: {
    screen: BuyListTab,
    navigationOptions: {
      tabBarLabel: 'Buy List',
      tabBarIcon: <Image source={require('../assets/images/shop.png')} />
    }
  },
  SettingsTab: {
    screen: SettingsTab,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: <Image source={require('../assets/images/settings.png')} />
    },
  }
}, {
  tabBarOptions: {
    showLabel: true
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
    },
  }
});

export default createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppNavigator,
  Auth: AuthStack,
}, {
  initialRouteName: 'AuthLoading',
});
