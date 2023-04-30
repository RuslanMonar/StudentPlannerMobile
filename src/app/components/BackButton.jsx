import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export const BackButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <Icon ml='3'
                size="6"
                color='black'
                as={<MaterialIcons name='arrow-back-ios' />}
            />
        </TouchableOpacity>
    )
}
