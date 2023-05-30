import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Text, Icon, Pressable, Box, Divider, Input, Button, Avatar, TextArea } from "native-base";
import { PriorityPicker } from './PriorityPicker';
import { TomatosSlider } from './TomatosSlider';
import { DatePicker } from '../DatePicker';
import { ProjectPicker } from './ProjectPicker';
import PopupLoader from '../PopupLoader';
import tasksGateway from '../../gateways/tasksGateway';

export const TaskDetails = ({ task, closeDrawer, editTaskClosed = false, setEditTaskClosed, getTasksAsync }) => {
    const [showPriorityPickerModal, setShowPriorityPickerModal] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState();
    const [title, setTitle] = useState();
    const [clickedIcons, setClickedIcons] = useState();
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState();
    const [modifiedDate, setModifiedDate] = useState('');
    const [showProjectPickerModal, setShowProjectPickerModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(false);

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
            console.log(localDate.toString())
        }

    };

    const getFormatedDate = (date) => {
        console.log(date)
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
        setTitle("")
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

    const editTaskAsync = async () => {
        try {
            setLoading(true);
            console.log( new Date(selectedStartDate));
            var data = {
                TaskId: task?.id,
                ProjectId: selectedProject ? selectedProject.id : task?.project?.id,
                Title: title ? title : task?.title,
                TomatoCount: clickedIcons ? clickedIcons : task?.tomatoCount,
                Flag: selectedPriority ? selectedPriority : task?.flag,
                Date : selectedStartDate ? new Date(selectedStartDate) : task?.date,
            };
            await tasksGateway.EditTask(data);
            closeDrawerResetStates();
            setLoading(false);
            getTasksAsync()
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Box h="100%" background="gray.100">
            {loading ? (<PopupLoader />) : null}
            <Box flexDirection="row" justifyContent="center" alignItems="center">
                <Text fontSize="lg" mt={3}> Edit Task</Text>
                <Pressable style={styles.closeButton} onPress={closeDrawerResetStates}>
                    <Icon
                        size="6"
                        as={<MaterialCommunityIcons name="close" />}
                    />
                </Pressable>
            </Box>
            <Divider mt={4} />

            <Box p={1} background="white" flexDirection="row">
                <Input
                    variant="unstyled"
                    w="50%"
                    h="100%"
                    value={title ? title : task?.title}
                    onChangeText={(text) => setTitle(text)}
                    _focus={{
                        backgroundColor: "white",
                        borderColor: "none",
                    }}>

                </Input>
                <Pressable style={styles.closeButton} onPress={() => setShowPriorityPickerModal(true)}>
                    <Icon
                        size="6"
                        color={!selectedPriority ? getPriority(selectedPriority) : getPriority(task?.flag)}
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
                <Text mt={2}>{getFormatedDate(selectedStartDate ? selectedStartDate?.toString() : task?.date)}</Text>
            </Box>

            <Box mt={5} background="white" flexDirection="row" alignItems="center" justifyContent="space-between">
                <Text ml={2}>Selected Project : </Text>
                <Pressable onPress={() => setShowProjectPickerModal(true)}>
                    <Box p={4} alignItems="center" flexDirection="row" >
                        <Avatar ml={3} bg={selectedProject ? selectedProject?.color : task?.project?.color} size="15px" />
                        <Text ml={1} >{selectedProject ? selectedProject?.title : task?.project?.title}</Text>
                    </Box>
                </Pressable>
            </Box>

            <Box h="20%" mt={2} background="white" flexDirection="row">
                <TextArea variant="unstyled" h={20} placeholder="Text Area Placeholder" w="100%" h="100%"/>
            </Box>

            <Button background="yellow.500" onPress={editTaskAsync}>
                Save
            </Button>

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

            <ProjectPicker
                showModal={showProjectPickerModal}
                setShowModal={setShowProjectPickerModal}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject} />
        </Box>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10
    },
});