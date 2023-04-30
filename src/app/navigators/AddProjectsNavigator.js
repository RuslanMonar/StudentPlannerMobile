import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddFolder } from '../screens/AddProjects/AddFolder';
import { BackButton } from '../components/BackButton';

const Stack = createNativeStackNavigator();

export const AddProjectsNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => (<BackButton onPress={() => navigation.goBack()} />),
            contentStyle: { backgroundColor: "white" },
        }}>

            <Stack.Screen name="AddFolder" component={AddFolder} />
        </Stack.Navigator>
    )
}
