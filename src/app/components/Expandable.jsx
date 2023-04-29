import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Box, Text, Icon, Divider, Avatar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';

export const Expandable = ({ item }) => {
    const [layoutHeight, setLayoutHeight] = useState(0);


    return (
        <Box py={1} px="2" rounded="md">
            <View>
                <TouchableOpacity
                    activeOpacity={10}
                    onPress={() => {
                        item.isExpanded = !item.isExpanded;

                        if (item.isExpanded) {
                            setLayoutHeight(null);
                        } else {
                            setLayoutHeight(0);
                        }

                        LayoutAnimation.configureNext({
                            duration: 300,
                            create:
                            {
                                type: LayoutAnimation.Types.easeInEaseOut,
                                property: LayoutAnimation.Properties.opacity,
                            },
                            update:
                            {
                                type: LayoutAnimation.Types.easeInEaseOut
                            }
                        });
                    }}
                    style={styles.header}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <Box display="flex" flexDirection="row">
                            <Icon
                                ml="5px"
                                size="6"
                                color='red.500'
                                as={<MaterialIcons name='folder' />}
                            />
                            <Text ml={5} style={styles.headerText}>{item.category_name}</Text>
                        </Box>
                        <Icon
                            ml="5px"
                            size="6"
                            color='black'
                            as={<MaterialIcons name={item.isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />}
                        />
                    </Box>
                </TouchableOpacity>
                <Box>
                    <View style={{ height: layoutHeight, overflow: 'hidden' }}>
                        {item.subcategory.map((item, key) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.content}
                                onPress={() => alert('Id: ' + item.id + ' val: ' + item.val)}>
                                <Box ml="5%" display="flex" flexDirection="row" alignItems="center">
                                    <Avatar bg="#5d0fab" size="12px" />
                                    <Text style={styles.text}>
                                        {item.val}
                                    </Text>
                                </Box>
                                <Divider mt="1" width="100%" />
                            </TouchableOpacity>

                        ))}
                    </View>
                </Box>
            </View>
        </Box>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        backgroundColor: '#f5f5f5',
        padding: 5,
        borderRadius: 5
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
        fontSize: 16,
        color: '#606070',
        padding: 10,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#f5f5f5',
    },
});


