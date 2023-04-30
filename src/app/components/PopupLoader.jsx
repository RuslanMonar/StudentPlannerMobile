import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Center } from 'native-base';
import * as AppStyle from "../../styles/AppStyle";

const PopupLoader = () => {
    return (
        <Center position="absolute" background={AppStyle.yellow} w="100%" h="100%" zIndex="1" >
            <ActivityIndicator size='large' color="black" />
        </Center>
    );
}

export default PopupLoader;