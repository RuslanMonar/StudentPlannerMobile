import React,  { useState, useContext } from 'react';
import { TouchableOpacity } from 'react-native';

import { WarningOutlineIcon, Box, Heading, VStack, FormControl, Input, Image, Button, Center, Text } from "native-base";

import * as AppStyle from "../../../styles/AppStyle";
import * as Validation from '../../utils/validation';
import PopupLoader from './../../components/PopupLoader';
import authService from '../../services/authService'; 
import { AuthContext } from '../../context/AuthContext';

const SignUpScreen = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.nativeEvent.text);
  const handlePasswordChange = (e) => setPassword(e.nativeEvent.text);

  const signUp = () => {
    validationResult = Validation.validateEmail(email);
    setIsValidEmail(validationResult);

    if (validationResult) {
      setLoading(true);
      authService.SignUp(email, password)
        .then(response => {
          setLoading(false);
          setIsLoggedIn(true);
        })
        .catch(error => {
          setLoading(false);
        });
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
      <Box safeArea p="2" w="90%" h="60%">
        <Heading size="lg" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }} fontWeight="semibold">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" _dark={{
          color: "warmGray.200"
        }} fontWeight="medium" size="xs">
          Sign up to continue!
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
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input type="password" />
          </FormControl>
          <Button onPress={signUp} mt="2" bg={`${AppStyle.yellow}`}>
            Sign up
          </Button>
        </VStack>
        <Box mt="10%">
          <Center flexDirection="row" centerContent>
            <Text fontSize="sm">
              If you already have account
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
              <Text pl="1" color={`${AppStyle.yellow}`} bold underline>Sign In</Text>
            </TouchableOpacity>
          </Center>
        </Box>
      </Box>
      </Center>
      </Box>
  )
}


export default SignUpScreen;