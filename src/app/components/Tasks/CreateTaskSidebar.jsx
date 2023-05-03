import React from 'react'
import { Box, Icon, Text, Divider } from "native-base";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Pressable } from 'react-native';
import { TomatosSlider } from './TomatosSlider';
import { DatePicker } from '../DatePicker';
import { PriorityPicker } from './PriorityPicker';


export const CreateTaskSidebar = ({ isInputActive }) => {
    const [vieMoreTimers, setViewMoreTimers] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [showPriorityPickerModal, setShowPriorityPickerModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState("gray");
    const [clickedIcons, setClickedIcons] = useState([]);

    useEffect(() => {
        setViewMoreTimers(false);
        setSelectedStartDate(null);
    }, [isInputActive]);

    const getPriority = () => {
        if (selectedPriority == 'red') {
            return "error.600"
        }
        if (selectedPriority == 'yellow') {
            return "warning.400"
        }
        if (selectedPriority == 'green') {
            return "success.500"
        }
        if (selectedPriority == 'gray') {
            return "gray.400"
        }
    }

    const handleClick = (index) => {
        const newClickedIcons = [...clickedIcons];
        for (let i = 0; i <= index; i++) {
            if (!newClickedIcons.includes(i)) {
                newClickedIcons.push(i);
            }
        }
        setClickedIcons(newClickedIcons);
    };

    const handleDisable = (index) => {
        const newClickedIcons = clickedIcons.filter((clickedIndex) => clickedIndex <= index);
        setClickedIcons(newClickedIcons);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style={styles.inner}>
                {isInputActive && (
                    <View style={styles.fixedView}>
                        <Box alignItems="center"
                            bg="white" width="100%" height="100%"
                            borderTopLeftRadius="xl" borderTopRightRadius="xl">
                            <Text color="gray.200">Expected time</Text>
                            {!vieMoreTimers ? (
                                <Box width="100%" flexDirection="row" justifyContent="space-around">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Pressable
                                            key={index}
                                            onPress={() => handleClick(index)}
                                            onLongPress={() => handleDisable(index)}
                                        >
                                            <Icon
                                                mt={2}
                                                size="7"
                                                color={clickedIcons.includes(index) ? 'red.500' : 'gray.200'}
                                                as={<MaterialCommunityIcons name="timer" />}
                                            />
                                        </Pressable>
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
                                <Pressable onPress={() => setShowDateModal(true)}>
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
                                <Pressable onPress={() => setShowPriorityPickerModal(true)}>
                                    <Box alignItems="center" flexDirection="row">
                                        <Icon
                                            mt={2}
                                            size="6"
                                            color={getPriority()}
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
                                    <Box p={0.2} mt={2} rounded style={{ borderRadius: 50 }} bg="green.500" alignItems="center" flexDirection="row">
                                        <Icon
                                            size="6"
                                            color="white"
                                            as={<Ionicons name='checkmark' />}
                                        />
                                    </Box>
                                </Pressable>
                            </Box>
                        </Box>
                    </View>
                )}

                <DatePicker
                    showModal={showDateModal}
                    setShowModal={setShowDateModal}
                    selectedStartDate={selectedStartDate}
                    setSelectedStartDate={setSelectedStartDate} />

                <PriorityPicker
                    showModal={showPriorityPickerModal}
                    setShowModal={setShowPriorityPickerModal}
                    selectedPriority={selectedPriority}
                    setSelectedPriority={setSelectedPriority} />
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
