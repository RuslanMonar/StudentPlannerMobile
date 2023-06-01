import React, { useState, useEffect } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { View, Text, Dimensions, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Container } from "native-base"; import { VictoryPie } from 'victory-native';
import tasksGateway from '../../gateways/tasksGateway';
;

export const Statistic = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [monthes, setMonthes] = React.useState([]);
    const [hours, setHours] = React.useState([]);

    const [projectTaskNames, setProjectTaskNames] = React.useState([]);
    const [projectTaskTime, setProjectTaskTime] = React.useState([]);

    const [data, setData] = useState([
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100
    ]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        GetTaskTrackByMonthAsync()
        setData([
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
        ]);
        setRefreshing(false);

    }, []);

    useEffect(() => {
        GetTaskTrackByMonthAsync()
    }, []);

    const GetTaskTrackByMonthAsync = async () => {
        try {
            //setLoading(true);
            var result = await tasksGateway.GetTaskTrackByMonth();
            console.log(result.data)
            setMonthes(result.data.monthes)
            setHours(result.data.spentMonthHours)
            setProjectTaskNames(result.data.projectTaskNames)
            setProjectTaskTime(result.data.projectTaskTime)
            if (result) {
                //setTasks(result.data);
            }
            //setLoading(false);
        } catch (error) {
            console.log(error)
            //setLoading(false);
        }
    };



    return (

        <SafeAreaView >
            <Box h="100%" w="100%">
                <ScrollView

                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {monthes.length > 0 && hours.length > 0 ? (<View>
                        <LineChart
                            fromZero={true}
                            data={{
                                labels: monthes,
                                datasets: [
                                    {
                                        data: hours
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="h"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />


                    </View>) : null}
                    
                    <Box bg="black" justifyContent="center" alignItems="center">
                        <VictoryPie
                            data={[
                                { y: 10, x: '5' },
                                { y: 90, x: '90' },
                                { y: 50, x: '50' },
                                { y: 20, x: '20' },
                                { y: 70, x: '70' },
                            ]}
                            width={250}
                            height={250}
                            innerRadius={50}
                            colorScale={['red', 'blue', 'yellow', 'green', 'tomato']}
                            style={{
                                labels: {
                                    fill: 'white', fontSize: 15, padding: 7,
                                },
                            }}
                        />
                    </Box>
                    {projectTaskNames.length > 0 && projectTaskTime.length > 0 ? (<Box mt="10" mb="10">
                        <BarChart
                            data={{
                                labels: projectTaskNames,
                                datasets: [
                                    {
                                        data: projectTaskTime
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width}
                            height={290}
                            yAxisSuffix="h"
                            verticalLabelRotation={30}
                            chartConfig={{
                                backgroundColor: "#ac8de3",
                                backgroundGradientFrom: "#ac8de3",
                                backgroundGradientTo: "#ac8de3",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "2",
                                    stroke: "#ffa726"
                                }
                            }}
                        />
                    </Box>) : null}

                
                </ScrollView>


            </Box>
        </SafeAreaView>

    )
}
