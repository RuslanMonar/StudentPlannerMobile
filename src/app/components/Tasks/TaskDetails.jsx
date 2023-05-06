import React, { useRef, useState } from 'react';
import {
    Button,
    DrawerLayoutAndroid,
    Text,
    StyleSheet,
    View,
} from 'react-native';

export const TaskDetails = ({closeDrawer}) => {
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState('right');


    return (
        <View style={[styles.container, styles.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button
                title="Close drawer"
                onPress={closeDrawer}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: 'center',
    },
});