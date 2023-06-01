import React from 'react'
import { Text, Input, InputGroup, InputLeftAddon, Box, VStack, Icon, Pressable, Checkbox, Avatar, Button, Container, Contents } from "native-base";
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tasksGateway from '../../gateways/tasksGateway';
import PopupLoader from '../../components/PopupLoader';

export const MainTimer = ({ route, navigation }) => {
    const { task } = route.params;
    const [timerKey, setTimerKey] = useState(task.id);
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [timer, setTimer] = React.useState()
    const [startDate, setStartDate] = React.useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (timerKey != task.id) {
            setTimerKey(task.id)
            setIsPlaying(false)
        }
    }, [task]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

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

    const addTaskTrackAsync = async () => {
        try {
            setLoading(true);
            var data = {
                TaskId: task?.id,
                StartDate: startDate,
                TimeSpentInMinutes : Math.trunc((task.tomatoLength * 60 - timer)/60)
            };
            await tasksGateway.AddTaskTrack(data);
            
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const saveResults = () => {
        setIsPlaying(false)
        addTaskTrackAsync();
        setTimerKey(timerKey + 1);
        setTimeout(() => {
            setLoading(false);
            navigation.goBack();
          }, 2000);
        
    }

    return (
        <Box alignItems="center" display="flex" w="100%" h="100%" bg="gray.100" >
            {loading ? (<PopupLoader />) : null}
            <Box mt="5" mb="5" w="80%"
                style={{ borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' }}
                justifyContent="space-between"
                flexDirection="row"
                alignItems="center"
                bg="white"
                height="50px">
                <Box w="100%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" colorScheme="orange" value="Writing" ml={3}>
                    <Icon
                        size="6"
                        color={getPriority(task.flag)}
                        as={<MaterialCommunityIcons name="flag" />}
                    />
                    <Text ml="5">{task.title}</Text>
                    <Box w="100%" display="flex" ml={2} flexDirection="row" justifyContent="space-around" alignItems="center" >

                        <Box flexDirection="row">
                            <Text mr={1} style={{ lineHeight: 14 }}>{task?.timeCompleted / task.tomatoLength} /</Text>
                            <Text mr={1} style={{ lineHeight: 14 }}>{task?.tomatoCount}</Text>
                            <Icon
                                size="3"
                                color="red.500"
                                as={<MaterialCommunityIcons name="timer" />}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CountdownCircleTimer
                key={timerKey}
                isPlaying={isPlaying}
                duration={task.tomatoLength * 60}
                colors={["#eab308",'#004777', '#F7B801', '#A30000', '#A30000']}
                size={250}
                strokeWidth={15}
                strokeLinecap="butt"
                onComplete={() => {
                    return ({ shouldRepeat: false, delay: 2 })
                }}
                updateInterval={1}
            >
                {({ remainingTime }) => (
                    <Text fontSize="35">
                        {setTimer(remainingTime)}
                        {formatTime(remainingTime)}
                    </Text>
                )}
            </CountdownCircleTimer>
            <Box mt='10' display="flex" alignItems="center" justifyContent="center" w="100%" flexDirection="row">
                <Button style={{
                    elevation: 4,
                    height: 70,
                    width: 70,
                    bottom: 0,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 35,
                    backgroundColor: isPlaying ? "#e63751":'#32a852' ,
                    justifyContent: 'center'
                }}
                    onPress={() => {
                        setIsPlaying(prev => !prev)
                        if (!startDate) {
                            setStartDate(new Date());
                        }
                    }} >
                    <Icon
                        size="12"
                        color="white"
                        as={<MaterialCommunityIcons name={isPlaying ? "stop" : "play"} />}
                    />
                </Button>

                <Button ml='7' style={{
                    elevation: 4,
                    height: 70,
                    width: 70,
                    bottom: 0,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 35,
                    backgroundColor: '#377de6',
                    justifyContent: 'center'
                }}
                    onPress={() => setTimerKey(timerKey + 1)} >
                    <Icon
                        size="12"
                        color="white"
                        as={<MaterialCommunityIcons name='restart' />}
                    />
                </Button>
            </Box>
            <Box mt="35px">
                <Button style={{
                    elevation: 4,
                    height: 70,
                    width: 250,
                    bottom: 0,
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 35,
                    backgroundColor: '#f5f5f5',
                    justifyContent: 'center',
                }}
                    onPress={() => saveResults()} >
                    <Box flexDirection="row" alignItems="center">
                        <Text fontSize="15">Save progress and close</Text>
                        <Icon
                            size="10"
                            color="gray.400"
                            as={<MaterialCommunityIcons name='close' />}
                        />
                    </Box>
                </Button>
            </Box>
        </Box >
    )
}
