import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Input, InputGroup, InputLeftAddon, Box, VStack, Icon, Pressable, Checkbox, Avatar } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from 'react';
import { Keyboard, LayoutAnimation, ScrollView, DrawerLayoutAndroid } from 'react-native';
import { CreateTaskSidebar } from "../../components/Tasks/CreateTaskSidebar";
import PopupLoader from './../../components/PopupLoader';
import tasksGateway from "../../gateways/tasksGateway";
import { TaskDetails } from "../../components/Tasks/TaskDetails";

const MainScreen = ({ navigation }) => {
    const [taskName, setTaskName] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);
    const drawer = useRef(null);
    const [drawerPosition, setDrawerPosition] = useState('right');

    useEffect(() => {
        getTasksAsync();

        const keyboardWillShowSub = Keyboard.addListener(
            'keyboardWillShow',
            handleKeyboardWillShow
        );
        const keyboardWillHideSub = Keyboard.addListener(
            'keyboardWillHide',
            handleKeyboardWillHide
        );

        return () => {
            keyboardWillShowSub.remove();
            keyboardWillHideSub.remove();
        };
    }, []);


    const getTasksAsync = async () => {
        try {
            setLoading(true);
            var result = await tasksGateway.GetTasks();
            if (result) {
                setTasks(result.data);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleKeyboardWillShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsInputActive(true);
    };

    const handleKeyboardWillHide = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsInputActive(false);
    };

    const handlePressOutsideInput = (event) => {
        inputRef.current?.blur();
        Keyboard.dismiss();
    };

    const closeDrawer = () => {
        drawer.current.closeDrawer();
      };

    return (
        <Box w="100%" h="100%">
            {loading ? (<PopupLoader />) : null}
            <DrawerLayoutAndroid
                ref={drawer}
                drawerWidth={300}
                drawerPosition={drawerPosition}
                renderNavigationView={() => <TaskDetails closeDrawer={closeDrawer} />}>
                
                <Pressable onPress={handlePressOutsideInput}>
                    <SafeAreaView>
                        <Box bg="gray.100" height="100%" width="100%">
                            <VStack space={4} w="100%" mx="auto">
                                <Box display="flex" flexDirection="row" alignItems="center" >
                                    <InputGroup>
                                        <InputLeftAddon style={{ borderWidth: 0 }} bg="white" children={
                                            <Icon
                                                size="6"
                                                color="gray.400"
                                                as={<MaterialCommunityIcons name='plus' />}
                                            />}
                                        />

                                        <Input
                                            ref={inputRef}
                                            onFocus={() => setIsInputActive(true)}
                                            onBlur={() => setIsInputActive(false)}
                                            value={taskName} onChangeText={(text) => setTaskName(text)}
                                            width="100%"
                                            variant="unstyled"
                                            bg="white"
                                            disabledInputStyle="white"
                                            size="md" placeholder="Create Task"
                                            _focus={{
                                                backgroundColor: "white",
                                                borderColor: "none",
                                            }}
                                        />
                                    </InputGroup>
                                </Box>
                                <ScrollView>
                                    <Box>
                                        {tasks.map((project, index) => (
                                            <Box key={index}>
                                                {project.projectTasks.length > 0 && (
                                                    <Box  flexDirection="row" alignItems="center">
                                                        <Avatar ml={3} my={4} bg={project.color} size="15px" />
                                                        <Text ml={2}>{project.title}</Text>
                                                    </Box>
                                                )}

                                                {project?.projectTasks?.map((task, taskIndex) => (
                                                    <Pressable key={taskIndex} onPress={() => drawer.current.openDrawer()}>
                                                        <Box
                                                            style={{ borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' }}
                                                            justifyContent="space-between"
                                                            flexDirection="row"
                                                            alignItems="center"
                                                            bg="white"
                                                            height="50px">
                                                            <Checkbox colorScheme="orange" value="Writing" ml={3}>
                                                                <Box ml={2} flexDirection="column" justifyContent="flex-start">
                                                                    <Text>{task.title}</Text>
                                                                    <Box flexDirection="row">
                                                                        {task?.tomatoCount > 5 && (<Text mr={1} style={{ lineHeight: 14 }}>{task?.tomatoCount}</Text>)}
                                                                        {Array.from({ length: task?.tomatoCount <= 5 ? task?.tomatoCount : 1 }, (_, tomatoIndex) => (
                                                                            <Icon key={tomatoIndex}
                                                                                size="3"
                                                                                color="red.500"
                                                                                as={<MaterialCommunityIcons name="timer" />}
                                                                            />
                                                                        ))}
                                                                    </Box>
                                                                </Box>
                                                            </Checkbox>
                                                            <Icon
                                                                mr={5}
                                                                size="6"
                                                                color="yellow.500"
                                                                as={<MaterialCommunityIcons color="black" name="play-circle" />}
                                                            />
                                                        </Box>
                                                    </Pressable>
                                                ))}
                                            </Box>
                                        ))}

                                    </Box>
                                </ScrollView>
                            </VStack>
                        </Box>

                        <Pressable>
                            <CreateTaskSidebar
                                isInputActive={isInputActive}
                                taskName={taskName}
                                setTaskName={setTaskName}
                                setLoading={setLoading}
                                getTasksAsync={getTasksAsync} />
                        </Pressable>

                    </SafeAreaView>
                </Pressable>
            </DrawerLayoutAndroid>
        </Box>
    );
}


export default MainScreen;
