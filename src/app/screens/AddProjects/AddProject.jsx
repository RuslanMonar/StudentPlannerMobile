import React, { useState, useEffect } from 'react'
import { Input, InputGroup, InputLeftAddon, Box, VStack, Avatar, Icon, Pressable, Button, Text, Select, CheckIcon } from "native-base";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as AppStyle from "../../../styles/AppStyle";
import projectsGateway from '../../gateways/projectsGateway';
import PopupLoader from '../../components/PopupLoader';
import foldersGateway from '../../gateways/foldersGateway';

export const AddProject = ({ navigation }) => {
    const colors = ['#FF6B6B', '#FFE66D', '#8DD7CF', '#FFD57E', '#B2FFA9', '#FFB347', '#83D0F2', '#FF8FB2', '#AEEEEE', '#FFA07A', '#90EE90', '#FA8072', '#BA55D3', '#FFC0CB', '#FF69B4', '#20B2AA', '#FFD700', '#87CEFA', '#6495ED', '#40E0D0', '#7B68EE', '#9370DB', '#AFEEEE', '#FF7F50', '#3CB371', '#87CEEB', '#FFA500', '#6B8E23', '#00FA9A', '#FF69B4'];
    const [activeColor, setActiveColor] = useState(colors[0]);
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const [listDataSource, setListDataSource] = useState([]);
    const [selectedFolder, setSelectedFolder] = React.useState();

    const createProject = async () => {
        try {
            setLoading(true);
            await projectsGateway.CreateProject(projectName, activeColor, selectedFolder);
            setProjectName("");
            navigation.goBack();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        var response = await foldersGateway.GetFolders();
        if (response) {
            var transformedObject = response.data?.map(obj => ({
                isExpanded: false,
                category_name: obj.title,
                color: obj.color,
                id: obj.id,
                subcategory: obj.projects?.map(project => ({
                    id: project.id,
                    val: project.title,
                    color: project.color
                }))
            }));
            console.log(transformedObject);
            setListDataSource(transformedObject);
        }

    };

    function handleOpen() {
        fetchData();
    }


    return (
        <Box bg="gray.100" height="100%" width="100%">
            {loading ? (<PopupLoader />) : null}
            <VStack space={4} w="100%" mx="auto">
                <Box mt={5} display="flex" flexDirection="row" alignItems="center" >
                    <InputGroup>
                        <InputLeftAddon style={{ borderWidth: 0 }} bg="white" children={<Icon
                            mr={1}
                            size="6"
                            color={activeColor}
                            as={<MaterialCommunityIcons name='plus' />}
                        />} />

                        <Input
                            value={projectName} onChangeText={(text) => setProjectName(text)}
                            width="100%"
                            variant="unstyled"
                            bg="white"
                            disabledInputStyle="white"
                            size="md" placeholder="Project Name"
                            _focus={{
                                backgroundColor: "white",
                                borderColor: "none",
                            }}
                        />
                    </InputGroup>
                </Box>

                <Select onOpen={handleOpen} bordered={false} bg="white" selectedValue={selectedFolder} minWidth="200"
                    accessibilityLabel="Choose Folder" placeholder="Choose Service" _selectedItem={{
                        bg: "transparent",
                        endIcon: <CheckIcon size="5" renderLeftIcon={() => <MaterialIcons name='folder' size={4} />} />
                    }} mt={1} onValueChange={itemValue => setSelectedFolder(itemValue)}>
                    {listDataSource.map((item, key) => (
                        <Select.Item leftIcon={<Icon
                            ml="5px"
                            size="6"
                            color={item.color}
                            as={<MaterialIcons name='folder' />}
                        />} key={key} label={item.category_name} value={item.id} />
                    ))}
                </Select>


                <Box bg="white" display="flex" flexWrap="wrap" flexDirection="row" space={4}>
                    {colors.map((item, key) => (
                        <Pressable onPress={() => setActiveColor(item)} key={key}>
                            <Avatar ml={8} my={4} bg={item} key={key} size="35px" />
                        </Pressable>
                    ))}
                </Box>


                <Button onPress={createProject}
                    background={AppStyle.yellow} rightIcon={<Icon as={Ionicons} name="checkmark-circle-outline" size="md" color="black" />}>
                    <Text color="black">Create Project</Text>
                </Button>
            </VStack>
        </Box>
    );
}