import React from 'react'
import { Box, Icon, Text, Divider } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Pressable } from 'react-native';
import { TomatosSlider } from './TomatosSlider';
import { DatePicker } from '../DatePicker';


export const CreateTaskSidebar = ({ isInputActive }) => {
    const [vieMoreTimers, setViewMoreTimers] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);

    useEffect(() => {
        setViewMoreTimers(false);
        setSelectedStartDate(null);
    }, [isInputActive]);

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
                            {!vieMoreTimers ? (
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
                                    <Pressable onPress={() => setViewMoreTimers(true)}>
                                        <Icon
                                            mt={2}
                                            size="7"
                                            color="gray.200"
                                            as={<MaterialIcons name='keyboard-arrow-right' />}
                                        />
                                    </Pressable>
                                </Box>
                            ) : < TomatosSlider />}

                            <Divider mt="3" width="100%" />

                            <Box justifyContent="space-around" alignItems="flex-start" flexDirection="row" width="100%" height="100%">
                                <Pressable onPress={() => setShowModal(true)}>
                                    <Box alignItems="center" flexDirection="row">
                                        <Icon
                                            mt={2}
                                            size="6"
                                            color="purple.500"
                                            as={<Ionicons name='calendar' />}
                                        />
                                        <Text ml={1} mt={2}>Date</Text>
                                    </Box>
                                </Pressable>
                                <Pressable>
                                    <Box alignItems="center" flexDirection="row">
                                        <Icon
                                            mt={2}
                                            size="6"
                                            color="gray.400"
                                            as={<Ionicons name='flag' />}
                                        />
                                        <Text ml={1} mt={2}>Priority</Text>
                                    </Box>
                                </Pressable>
                                <Pressable>
                                    <Box alignItems="center" flexDirection="row">
                                        <Icon
                                            mt={2}
                                            size="6"
                                            color="blue.400"
                                            as={<Ionicons name='archive' />}
                                        />
                                        <Text ml={1} mt={2}>Project</Text>
                                    </Box>
                                </Pressable>
                                <Pressable>
                                    <Box p={0.2} mt={2} rounded style={{ borderRadius: 50 }} bg="green.400" alignItems="center" flexDirection="row">
                                        <Icon
                                            size="6"
                                            color="black"
                                            as={<Ionicons name='checkmark' />}
                                        />
                                    </Box>
                                </Pressable>
                            </Box>
                        </Box>
                    </View>
                )}
                <DatePicker
                    showModal={showModal}
                    setShowModal={setShowModal}
                    selectedStartDate={selectedStartDate}
                    setSelectedStartDate={setSelectedStartDate} />
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
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
