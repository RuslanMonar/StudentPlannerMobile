import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Text, Icon, Pressable, Box, Divider, Input, Button } from "native-base";
import { PriorityPicker } from './PriorityPicker';
import { TomatosSlider } from './TomatosSlider';
import { DatePicker } from '../DatePicker';

export const TaskDetails = ({ task, closeDrawer, editTaskClosed=false, setEditTaskClosed }) => {
    const [showPriorityPickerModal, setShowPriorityPickerModal] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(task?.flag);
    const [clickedIcons, setClickedIcons] = useState(task?.flag);
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(task?.date);
    const [modifiedDate, setModifiedDate] = useState('');
    

    const getPriority = (color) => {
        if (color == 'red') {
            return "error.600"
        }
        if (color == 'yellow') {
            return "warning.400"
        }
        if (color == 'green') {
            return "success.500"
        }
        if (color == 'gray') {
            return "gray.400"
        }
    }

    const calcTotalTime = () => {
        return convertMinutesToHoures(clickedIcons > 0 ? (clickedIcons) * 25 : task?.tomatoCount * 25);
    }

    const convertMinutesToHoures = (minutes) => {
        if (minutes < 60) {
            return minutes + " minutes";
        } else {
            var hours = Math.floor(minutes / 60); // Get the whole number of hours
            var remainingMinutes = minutes % 60; // Get the remaining minutes

            if (remainingMinutes === 0) {
                return hours + " hours";
            } else {
                return hours + " hours " + remainingMinutes + " minutes";
            }
        }
    }

    const handleClick = (index) => {
        setClickedIcons(index + 1);
    };

    const setDefailtSliderIndex = () => {
        return task?.tomatoCount && task?.tomatoCount > 0 ? task?.tomatoCount - 1 : clickedIcons;
    };


    const handleDateModification = () => {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (!timeRegex.test(modifiedDate)) {
            Alert.alert('Invalid Time', 'Please enter a valid time in HH:mm format.');
            return;
        }

        if (selectedStartDate) {
            const [hours, minutes] = modifiedDate.split(':');

            const localDate = new Date(selectedStartDate);

            localDate.setHours(hours);
            localDate.setMinutes(minutes);

            setSelectedStartDate(localDate.toString());
        }

    };

    const getFormatedDate = (date) => {
        if (date) {
            const newDate = new Date(date.toString());

            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
                timeZoneName: "short",
            };

            var formattedDate = new Intl.DateTimeFormat("en-US", options).format(newDate);
            return formattedDate;
        }
    }

    const closeDrawerResetStates = () => {
        setSelectedPriority(task?.flag);
        setClickedIcons(0);
        setSelectedStartDate(task?.date);
        setEditTaskClosed(false);
        setModifiedDate('');
        closeDrawer();
    }

    const maskDate = (input) => {
        if (input) {
            const digitsOnly = input.replace(/[^\d]/g, ''); // Remove non-digit characters
            const hours = digitsOnly.slice(0, 2);
            const minutes = digitsOnly.slice(2, 4);
            return `${hours}:${minutes}`;
        }

    };

    return (
        <Box h="100%" background="gray.100">
            <Box flexDirection="row" justifyContent="center" alignItems="center">
                <Text fontSize="lg" > Edit Task</Text>
                <Pressable style={styles.closeButton} onPress={closeDrawerResetStates}>
                    <Icon
                        size="6"
                        as={<MaterialCommunityIcons name="close" />}
                    />
                </Pressable>
            </Box>
            <Divider mt={4} />

            <Box p={1} background="white" flexDirection="row">
                <Text>{task?.title}</Text>
                <Pressable style={styles.closeButton} onPress={() => setShowPriorityPickerModal(true)}>
                    <Icon
                        size="6"
                        color={!selectedPriority ? getPriority(task?.flag) : getPriority(selectedPriority)}
                        as={<MaterialCommunityIcons name="flag" />}
                    />
                </Pressable>
            </Box>

            <Box mb={10} w="100%" mt={5} background="white" alignItems="center">
                <Box mt={2} flexDirection="row" alignItems="center">
                    <Text>
                        Number of total tomatoes (
                    </Text>
                    <Icon
                        size="5"
                        color="gray.300"
                        as={<MaterialCommunityIcons name="timer" />}
                    />
                    <Text>
                        =
                        <Text color="#0071fa" > 25 min)</Text>
                    </Text>
                </Box>
                <Text mb={7}>
                    Total time =
                    <Text color="#0071fa" > {calcTotalTime()} </Text>
                </Text>
                {editTaskClosed && (<TomatosSlider defaultIndex={setDefailtSliderIndex()} width="100%" handleClick={handleClick} />)}
                
                
            </Box>

            <Box mt={5} pt={5} background="white" flexDirection="row" flexWrap="wrap" justifyContent="center">
                <Pressable onPress={() => { setShowDateModal(true); }}>
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

                <Box ml={15} flexDirection="row">
                    <Button background="purple.500" size="sm" title="Modify Date" onPress={() => handleDateModification()} >
                        Change time
                    </Button>

                    <Input
                        placeholder="HH:mm"
                        value={maskDate(modifiedDate)}
                        onChangeText={(value) => setModifiedDate(maskDate(value))}
                        height="40px" width="40%"
                    />

                </Box>
                <Text mt={2}>{getFormatedDate(selectedStartDate?.toString())}</Text>
            </Box>

            <PriorityPicker
                showModal={showPriorityPickerModal}
                setShowModal={setShowPriorityPickerModal}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority} />

            <DatePicker
                showModal={showDateModal}
                setShowModal={setShowDateModal}
                selectedStartDate={selectedStartDate}
                setSelectedStartDate={setSelectedStartDate} />


        </Box>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 10,
    },
});