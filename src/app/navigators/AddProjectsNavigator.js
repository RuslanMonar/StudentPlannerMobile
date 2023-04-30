import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AddFolder } from '../screens/AddProjects/AddFolder';
import { BackButton } from '../components/BackButton';
import { AddProject } from '../screens/AddProjects/AddProject';

const Stack = createNativeStackNavigator();

export const AddProjectsNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: true,
            headerTitleAlign: "center",
            headerLeft: () => (<BackButton onPress={() => navigation.goBack()} />),
            contentStyle: { backgroundColor: "white" },
        }}>

            <Stack.Screen name="Add Folder" component={AddFolder} />
            <Stack.Screen name="Add Project" component={AddProject} />
        </Stack.Navigator>
    )
}
