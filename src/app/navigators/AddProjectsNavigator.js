import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddFolder } from '../screens/AddProjects/AddFolder';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

const Stack = createNativeStackNavigator();

export const AddProjectsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: (props) => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ marginLeft: 10 }}>Back</Text>
          </TouchableOpacity>
        ),
        contentStyle: { backgroundColor: "white" },
    }}>
        
        <Stack.Screen name="AddFolder" component={AddFolder} />
    </Stack.Navigator>
  )
}
