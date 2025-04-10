// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import SearchView from '../views/SearchView';
import BrowseOptionsView from '../views/BrowseOptionsView';
import InformationView from '../views/InformationView';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
      <Tab.Navigator> 
        <Tab.Screen name="Home" component={SearchView} />
        <Tab.Screen name="Browse" component={BrowseOptionsView} />
        <Tab.Screen name="Info" component={InformationView} />
      </Tab.Navigator>
    );
  }
  
