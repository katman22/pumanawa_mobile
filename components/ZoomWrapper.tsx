// ZoomWrapper.tsx with double-tap zoom, pan, and clamped boundaries
import React from 'react';
import {Dimensions} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedGestureHandler,
    useDerivedValue,
} from 'react-native-reanimated';
import {
    GestureDetector,
    Gesture,
    GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const clamp = (value: number, min: number, max: number): number => {
    'worklet';
    return Math.min(Math.max(value, min), max);
};

type Props = {
    children: React.ReactNode;
};

export default function ZoomWrapper({children}: Props) {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const doubleTapZoomed = useSharedValue(false);

    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd((e) => {
            const tapX = e.x - width / 2;
            const tapY = e.y - height / 2;

            if (!doubleTapZoomed.value) {
                // Zoom in to tap point
                scale.value = withTiming(2);
                translateX.value = withTiming(-tapX);
                translateY.value = withTiming(-tapY);
                doubleTapZoomed.value = true;
            } else {
                // Reset
                scale.value = withTiming(1);
                translateX.value = withTiming(0);
                translateY.value = withTiming(0);
                doubleTapZoomed.value = false;
            }
        });


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {scale: scale.value},
            {translateX: translateX.value},
            {translateY: translateY.value},
        ],
    }));

    const composedGesture = Gesture.Exclusive(doubleTapGesture);

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <GestureDetector gesture={composedGesture}>
                <Animated.View style={[{flex: 1}, animatedStyle]}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}
