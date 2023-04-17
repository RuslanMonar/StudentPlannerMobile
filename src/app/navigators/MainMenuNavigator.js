import MainMenu from "../components/MainMenu";
import SignInScreen from "../screens/Auth/SignInScreen";
import MainScreen from "../screens/Main/MainScreen";

import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const MainMenuNavigator = () => {

    return (
        <Drawer.Navigator drawerContent={(props) => <MainMenu {...props} />} screenOptions={{
            headerShown: true,
            drawerStyle: {
                width: "100%",
            }
        }}>
            <Drawer.Screen name="Home" component={MainScreen} />
            <Drawer.Screen name="SignInScreen" component={SignInScreen} />
        </Drawer.Navigator>
    );
};

export default MainMenuNavigator;