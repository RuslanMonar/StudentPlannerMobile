import * as React from 'react';
import { Dimensions, Text, View, Pressable } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const PAGE_WIDTH = 60;
const PAGE_HEIGHT = 40;
const DATA = Array.from({ length: 20 }, (_, i) => i + 1);

export const TomatosSlider = () => {
    const r = React.useRef(null);
    const [loop, setLoop] = React.useState(false);

    return (
        <View style={{ flex: 1, minHeight:'35%', width: '90%' }}>
            <View >
                <Carousel
                    key={`${loop}`}
                    ref={r}
                    loop={loop}
                    style={{
                        width: '100%',
                        height: PAGE_HEIGHT,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#0071fa",
                    }}
                    width={PAGE_WIDTH}
                    height={PAGE_HEIGHT}
                    data={DATA}
                    defaultIndex={5}
                    renderItem={({ item, animationValue }) => {
                        return (
                            <Item
                                animationValue={animationValue}
                                label={item}
                                onPress={() =>
                                    r.current?.scrollTo({
                                        count: animationValue.value,
                                        animated: true,
                                    })
                                }
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
}


const Item = (props) => {
    const { animationValue, label, onPress } = props;

    const translateY = useSharedValue(0);

    const containerStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
        );

        return {
            opacity,
        };
    }, [animationValue]);

    const labelStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            animationValue.value,
            [-1, 0, 1],
            [1, 1.25, 1],
            Extrapolate.CLAMP,
        );

        const color = interpolateColor(
            animationValue.value,
            [-1, 0, 1],
            ["#b6bbc0", "#0071fa", "#b6bbc0"],
        );

        return {
            transform: [{ scale }, { translateY: translateY.value }],
            color,
        };
    }, [animationValue, translateY]);

    const onPressIn = React.useCallback(() => {
        translateY.value = withTiming(-8, { duration: 250 });
    }, [translateY]);

    const onPressOut = React.useCallback(() => {
        translateY.value = withTiming(0, { duration: 250 });
    }, [translateY]);

    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View
                style={[
                    {
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    containerStyle,
                ]}
            >
                <Animated.Text
                    style={[{ fontSize: 18, color: "#26292E" }, labelStyle]}
                >
                    {label}
                </Animated.Text>
            </Animated.View>
        </Pressable>
    );
};
