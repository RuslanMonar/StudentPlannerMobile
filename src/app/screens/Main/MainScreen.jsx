import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputGroup, InputLeftAddon, Box, VStack, Icon, Text } from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Keyboard, LayoutAnimation, TouchableWithoutFeedback } from 'react-native';
import { CreateTaskSidebar } from "../../components/Tasks/CreateTaskSidebar";
import { TomatosSlider } from "../../components/Tasks/TomatosSlider";

const MainScreen = ({ navigation }) => {
    const [taskName, setTaskName] = useState("");
    const [isInputActive, setIsInputActive] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
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

    const handleKeyboardWillShow = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsInputActive(true);
    };

    const handleKeyboardWillHide = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsInputActive(false);
    };

    const handlePressOutsideInput = () => {
        inputRef.current?.blur();
        Keyboard.dismiss();
    };

    return (
        <Box w="100%" h="100%">
            <TouchableWithoutFeedback onPress={handlePressOutsideInput}>
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
                        </VStack>
                    </Box>
                    <CreateTaskSidebar isInputActive={isInputActive} />
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </Box>
    );
}


export default MainScreen;