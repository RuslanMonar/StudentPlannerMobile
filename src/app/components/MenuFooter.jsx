import React from 'react';
import {
    Box,
    Pressable,
    Text,
    HStack,
    Icon,
    Center
} from "native-base";
import { useState } from 'react';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as AppStyle from "../../styles/AppStyle";

export const MenuFooter = (props) => {
    const [selected, setSelected] = useState(1);

    return (
        <Box>
            <HStack bg={AppStyle.yellow} alignItems="center" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer" py="3" flex={1} onPress={() => props.navigation.navigate("Projects", { screen: "AddFolder" })}>
                    <Center display="flex" flexDirection="row" alignItems="center" alignContent="center" >
                        <Icon mb="1" pt="2px" as={<MaterialCommunityIcons name='folder-multiple-plus' />} color="black" size="20px" />
                        <Text ml="10px" color="black" fontSize="15">
                            Add Folder
                        </Text>
                    </Center>
                </Pressable>

                <Pressable cursor="pointer" py="3" flex={1} onPress={() => setSelected(0)}>
                    <Center display="flex" flexDirection="row" alignItems="center" alignContent="center" >
                        <Icon mb="1" pt="2px" as={<MaterialCommunityIcons name='plus' />} color="black" size="20px" />
                        <Text ml="10px" color="black" fontSize="15">
                            Add Project
                        </Text>
                    </Center>
                </Pressable>
            </HStack>
        </Box>
    );
}
