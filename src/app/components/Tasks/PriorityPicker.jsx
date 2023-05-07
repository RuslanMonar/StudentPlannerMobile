import React from "react";
import { Button, Modal, Center, Text, Box, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const PriorityPicker = ({ showModal, setShowModal, selectedPriority, setSelectedPriority }) => {
    return (
        <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content width="375px" height="50%">
                    <Modal.CloseButton onPress={() => {
                        setShowModal(false);
                    }} />
                    <Modal.Header>Select Priority</Modal.Header>
                    <Modal.Body>
                        <Box
                            height="100%"
                            display="flex"
                            flexDirection="row"
                            flexWrap="wrap"
                            justifyContent="space-around"
                            alignItems="center">
                            <Pressable
                                onPress={() => { setSelectedPriority("red"); setShowModal(false); }}
                                ml={5}
                                mr={5}
                                mt={10}
                                alignItems="center"
                                bg="white" width={100}
                                height={100}
                                borderRadius={999} p={5}
                                background="error.600"
                            >
                                <Icon
                                    mt={2}
                                    size="10"
                                    color="white"
                                    as={<Ionicons name='flag' />}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => { setSelectedPriority("yellow"); setShowModal(false); }}
                                ml={5}
                                mr={5}
                                mt={10}
                                alignItems="center"
                                bg="white" width={100}
                                height={100}
                                borderRadius={999} p={5}
                                background="warning.400"
                            >
                                <Icon
                                    mt={2}
                                    size="10"
                                    color="white"
                                    as={<Ionicons name='flag' />}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => { setSelectedPriority("green"); setShowModal(false); }}
                                ml={5}
                                mr={5}
                                mt={10}
                                alignItems="center"
                                bg="white" width={100}
                                height={100}
                                borderRadius={999} p={5}
                                background="success.500"
                            >
                                <Icon
                                    mt={2}
                                    size="10"
                                    color="white"
                                    as={<Ionicons name='flag' />}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => { setSelectedPriority("gray"); setShowModal(false); }}
                                ml={5}
                                mr={5}
                                mt={10}
                                alignItems="center"
                                bg="white" width={100}
                                height={100}
                                borderRadius={999} p={5}
                                background="gray.400"
                            >
                                <Icon
                                    mt={2}
                                    size="10"
                                    color="white"
                                    as={<Ionicons name='flag' />}
                                />
                            </Pressable>
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Center>
    );
}
