import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";


const MainScreen = ({ navigation }) => {
    return (
        <Box w="100%" h="100%">
            <SafeAreaView>
                <Text>Hello menu</Text>
            </SafeAreaView>
        </Box>
    );
}

export default MainScreen;