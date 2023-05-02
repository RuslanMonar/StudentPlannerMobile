import React from 'react'
import { Box, Icon, Text } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import { TomatosSlider } from './TomatosSlider';


export const CreateTaskSidebar = ({isInputActive}) => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style={styles.inner}>
                {isInputActive && (
                    <View style={styles.fixedView}>
                        <Box alignItems="center" borderColor="yellow.500" borderWidth="2"
                            bg="white" width="100%" height="100%"
                            borderTopLeftRadius="xl" borderTopRightRadius="xl">
                            <Text color="gray.200">Expected time</Text>
                            <Box width="100%" flexDirection="row" justifyContent="space-around">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Icon
                                        mt={2}
                                        key={index}
                                        size="7"
                                        color="gray.200"
                                        as={<MaterialCommunityIcons name='timer' />}
                                    />
                                ))}
                                <Icon
                                    mt={2}
                                    size="7"
                                    color="gray.200"
                                    as={<MaterialIcons name='keyboard-arrow-right' />}
                                />
                            </Box>
                            <TomatosSlider/>
                        </Box>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView> 
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    fixedView: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
