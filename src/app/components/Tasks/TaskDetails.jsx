import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert  } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Text, Icon, Pressable, Box, Divider } from "native-base";
import { PriorityPicker } from './PriorityPicker';
import { TomatosSlider } from './TomatosSlider';
import { DatePicker } from '../DatePicker';

export const TaskDetails = ({ task, closeDrawer }) => {
    const [showPriorityPickerModal, setShowPriorityPickerModal] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(task?.flag);
    const [clickedIcons, setClickedIcons] = useState(0);
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
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
                <Pressable style={styles.closeButton} onPress={closeDrawer}>
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
                <TomatosSlider defaultIndex={setDefailtSliderIndex()} width="100%" handleClick={handleClick} />
            </Box>

            <Box mt={5} background="white">
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
                <Text>{selectedStartDate?.toString()}</Text>
                <View>
                    <TextInput
                        placeholder="HH:mm"
                        value={maskDate(modifiedDate)}
                        onChangeText={(value) => setModifiedDate(maskDate(value))}
                        style={{ borderWidth: 0.5, padding: 10, marginBottom: 10, width: "30%" }}
                    />
                    <Button title="Modify Date" onPress={handleDateModification} />
                </View>
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