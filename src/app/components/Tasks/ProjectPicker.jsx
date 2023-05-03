import React, { useState, useEffect } from "react";
import { Box, Avatar, Text, Center, Modal , Pressable} from "native-base";
import projectsGateway from "../../gateways/projectsGateway";

export const ProjectPicker = ({ showModal, setShowModal, selectedProject, setSelectedProject }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var response = await projectsGateway.GetProjects();
            if (response) {
                setProjects(response.data);
            }
        }
        fetchData();
    }, [showModal]);

    return (
        <Center>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content width="375px" height="50%">
                    <Modal.CloseButton onPress={() => {
                        setShowModal(false);
                        setSelectedProject(null);
                    }} />
                    <Modal.Header>Select Project</Modal.Header>
                    <Modal.Body>
                        <Box>
                            {projects.map((item, index) => (
                                <Pressable onPress={() => setSelectedProject(item)}>
                                    <Box flexDirection="row" alignItems="center">
                                        <Avatar ml={3} my={4} bg={item.color} key={index} size="15px" />
                                        <Text ml={5}>{item.title}</Text>
                                    </Box>
                                </Pressable>
                            ))}
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Center>
    )
}
