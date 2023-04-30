import React from 'react';
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
  Avatar,
  Center,
  Image
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as AppStyle from "../../styles/AppStyle";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from 'react';
import { LogOutAction } from "../appRedux/actionsCreator/authActions";
import { AuthContext } from "../context/AuthContext";
import { ProjectsMenu } from "./ProjectsMenu";
import { MenuFooter } from './MenuFooter';
import { BackButton } from './BackButton';
import { CONSTANTS } from '../constants/routesNames';

const MainMenu = (props) => {
  var userStore = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAuthState() {
      const resolvedAuthState = await userStore;
      if (resolvedAuthState.user) {
        setUser(resolvedAuthState.user);
      }
    }
    fetchAuthState();
  }, [])

  const logOut = async () => {
    dispatch(LogOutAction({}));
    setIsLoggedIn(false);
  }


  const getIcon = (screenName) => {
    switch (screenName) {
      case "Home":
        return "format-list-bulleted";
      default:
        return undefined;
    }
  };

  return (
    <DrawerContentScrollView  {...props} safeArea contentContainerStyle={styles.drawerContentContainer}>
      <Box>
        <VStack space="6" my="2" mx="1">
          <Box>
            <Box width="100%" flexDirection="row" alignItems="center">
              <BackButton  onPress={() => props.navigation.goBack()} />
              <Center width="80%">
                <Image source={require("../../../assets/logo-small.jpg")} alt="Planner" size="xs" width="50%" />
              </Center>
            </Box>
            <Divider mt="3" width="100%" />
          </Box>
          <Box alignItems="center" flexDirection="row" px="4" justifyContent="space-between">
            <Box flexDirection="row">
              <Avatar size="md" mr='2' bg="green.500" source={{
                uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
              }}>
                AJ
              </Avatar>
              <Text fontSize="14" mt="3" color="gray.500" fontWeight="500">
                {user?.email}
              </Text>
            </Box>

            <TouchableOpacity onPress={logOut}>
              <Box alignItems="center">
                <Icon
                  size="6"
                  color='black'
                  as={<MaterialIcons name='logout' />}
                />
                <Text>Log Out</Text>
              </Box>
            </TouchableOpacity>
          </Box>
          <VStack divider={<Divider />} space="4">
            <VStack space="3">
              {props.state.routeNames.map((name, index) => {
                if(!(name in CONSTANTS.NestedNavigators))
                return (
                  <Pressable key={index}
                    px="5"
                    py="3"
                    rounded="md"
                    bg={
                      index === props.state.index
                        ? `${AppStyle.yellow}`
                        : "transparent"
                    }
                    onPress={(event) => {
                      props.navigation.navigate(name);
                    }}
                  >
                    <HStack space="3" alignItems="center">
                      <Icon
                        color={
                          index === props.state.index ? "black" : "gray.500"
                        }
                        size="5"
                        as={<MaterialCommunityIcons name={getIcon(name)} />}
                      />
                      <Text
                        fontWeight="500"
                        color={
                          index === props.state.index ? "black" : "gray.700"
                        }
                      >
                        {name}
                      </Text>
                    </HStack>
                  </Pressable>
                )
              })}
            </VStack>
          </VStack>
        </VStack>
        <ProjectsMenu {...props}/>
      </Box>
      <MenuFooter {...props} />
    </DrawerContentScrollView>
  );
}

export default MainMenu;


const styles = StyleSheet.create({
  drawerContentContainer: { justifyContent: 'space-between', flex: 1 }
});