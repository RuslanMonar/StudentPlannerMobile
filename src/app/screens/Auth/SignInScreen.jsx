import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { TouchableOpacity } from 'react-native';
import { WarningOutlineIcon, Box, Heading, VStack, FormControl, Input, Image, Button, Center, Text } from "native-base";

import * as AppStyle from "../../../styles/AppStyle";
import * as Validation from '../../utils/validation';
import PopupLoader from './../../components/PopupLoader';
import authService from '../../services/authService';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange = (e) => setEmail(e.nativeEvent.text);
  const handlePasswordChange = (e) => setPassword(e.nativeEvent.text);

  const signIn = () => {
    validationResult = Validation.validateEmail(email);
    setIsValidEmail(validationResult);

    if (validationResult) {
      setLoading(true);

      dispatch(authService.SignIn(email, password))
        .then(response => {
          setLoading(false);
          navigation.navigate('MainScreen');
        })
        .catch(error => setLoading(false));
    }
  }

  return (
    <Box w="100%" h="100%">
      {loading ? (<PopupLoader />) : null}
      <Center h="80%" w="100%">

        <Box h="30%" w="100%">
          <Center >
            <Image source={require("../../../../assets/logo.jpg")} alt="Alternate Text" size="200" />
          </Center>
        </Box>
        <Box safeArea p="2" w="90%" h="60%" >
          <Heading size="lg" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }} fontWeight="semibold">
            Welcome
          </Heading>
          <Heading mt="1" color="coolGray.600" _dark={{
            color: "warmGray.200"
          }} fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isInvalid={!isValidEmail}>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChange={handleEmailChange} />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                Invalid email.
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input value={password} onChange={handlePasswordChange} type="password" />
            </FormControl>
            <Button onPress={signIn} mt="2" bg={`${AppStyle.yellow}`}>
              Sign in
            </Button>
          </VStack>
          <Box mt="10%">
            <Center flexDirection="row" centerContent>
              <Text fontSize="sm">
                If you do not have account
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text pl="1" color={`${AppStyle.yellow}`} bold underline>Sign Up</Text>
              </TouchableOpacity>
            </Center>
          </Box>
        </Box>
      </Center>
    </Box>
  )
}


export default SignInScreen;