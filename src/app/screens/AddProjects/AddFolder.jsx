import React, { useState } from 'react'
import { Input, InputGroup, InputLeftAddon, Box, VStack, Avatar, Icon, Pressable, Button, Text } from "native-base";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import * as AppStyle from "../../../styles/AppStyle";

export const AddFolder = () => {
  const colors = ['#FF6B6B', '#FFE66D', '#8DD7CF', '#FFD57E', '#B2FFA9', '#FFB347', '#83D0F2', '#FF8FB2', '#AEEEEE', '#FFA07A', '#90EE90', '#FA8072', '#BA55D3', '#FFC0CB', '#FF69B4', '#20B2AA', '#FFD700', '#87CEFA', '#6495ED', '#40E0D0', '#7B68EE', '#9370DB', '#AFEEEE', '#FF7F50', '#3CB371', '#87CEEB', '#FFA500', '#6B8E23', '#00FA9A', '#FF69B4'];
  const [activeColor, setActiveColor] = useState(colors[0]);

  return (
    <Box bg="gray.100" height="100%" width="100%">
      <VStack space={4} w="100%" mx="auto">
        <Box mt={5} display="flex" flexDirection="row" alignItems="center" >
          <InputGroup>
            <InputLeftAddon style={{ borderWidth: 0 }} bg="white" children={<Icon
              mr={1}
              size="6"
              color={activeColor}
              as={<MaterialIcons name='folder' />}
            />} />

            <Input width="100%" variant="unstyled" bg="white" disabledInputStyle="white" size="md" placeholder="Folder Name"
              _focus={{
                backgroundColor: "white",
                borderColor: "none",
              }}
            />
          </InputGroup>
        </Box>
        <Box bg="white" display="flex" flexWrap="wrap" flexDirection="row" space={4}>
          {colors.map((item, key) => (
            <Pressable onPress={() => setActiveColor(item)} key={key}>
              <Avatar ml={8} my={4} bg={item} key={key} size="35px" />
            </Pressable>
          ))}
        </Box>
        <Button background={AppStyle.yellow} rightIcon={<Icon as={Ionicons} name="checkmark-circle-outline" size="md" color="black" />}>
          <Text color="black">Create Folder</Text>
        </Button>
      </VStack>
    </Box>
  );
}