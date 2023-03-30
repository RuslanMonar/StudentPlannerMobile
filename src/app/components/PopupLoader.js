import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Center } from 'native-base';

const PopupLoader = () => {
    return (
        <Center position="absolute" background="coolGray.800" w="100%" h="100%" zIndex="1" >
            <ActivityIndicator size='large' color="yellow" />
        </Center>
    );
}

export default PopupLoader;