import MainMenu from "../components/MainMenu";
import MainScreen from "../screens/Main/MainScreen";

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const MainMenuNavigator = () => {
    return (
        <Drawer.Navigator  drawerContent={(props) => <MainMenu {...props} />} screenOptions={{
            headerShown: true,
            contentStyle: { backgroundColor: 'white' },
        }}>

        <Drawer.Screen name="MainScreen" component={MainScreen} />
        </Drawer.Navigator>
    );
};

export default MainMenuNavigator;