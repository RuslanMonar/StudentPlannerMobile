import React from "react";
import { Button, Modal, FormControl, Input, Center, Text } from "native-base";
import { useState } from "react";
import CalendarPicker from 'react-native-calendar-picker';

export const DatePicker = ({ showModal, setShowModal, selectedStartDate, setSelectedStartDate }) => {
    return <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content width="375px" height="90%">
                <Modal.CloseButton onPress={() => {
                    setShowModal(false);
                    setSelectedStartDate(null);
                }} />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                    <CalendarPicker selectedStartDate={selectedStartDate} selectedDayColor="#eab308" onDateChange={(date) => setSelectedStartDate(date)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                            setSelectedStartDate(null);
                        }}>
                            Cancel
                        </Button>
                        <Button background="yellow.500" onPress={() => {
                            setShowModal(false);
                        }}>
                            <Text color="black">Save</Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
}
