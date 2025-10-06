import React, { useCallback, useState } from 'react';
import {
  type NativeSyntheticEvent,
  Pressable,
  type StyleProp,
  StyleSheet,
  type TargetedEvent,
  View,
  type ViewStyle,
} from 'react-native';

import type { PressableWithFeedbackProps } from './types';

interface PressableCallbackStateType {
  pressed: boolean;
  hover?: boolean;
  focused?: boolean;
}

const defaultFeedbackStyle: StyleProp<ViewStyle> = {
  opacity: 0.3,
};

const PressableWithFeedback = React.forwardRef(
  (
    {
      feedbackStyle = defaultFeedbackStyle,
      onFocus,
      onBlur,
      style,
      children,
      ...rest
    }: PressableWithFeedbackProps,
    ref: React.ForwardedRef<View>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const styleFn = useCallback(
      (state: PressableCallbackStateType) => {
        const feedback = [(state.pressed || isFocused) && feedbackStyle];

        if (!style) {
          return feedback;
        }

        if (typeof style === 'function') {
          return StyleSheet.compose(feedback, style(state));
        }

        return StyleSheet.compose(feedback, style);
      },
      [feedbackStyle, isFocused, style],
    );

    const handleFocus = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        setIsFocused(true);
        onFocus?.(event);
      },
      [onFocus],
    );

    const handleBlur = useCallback(
      (event: NativeSyntheticEvent<TargetedEvent>) => {
        setIsFocused(false);
        onBlur?.(event);
      },
      [onBlur],
    );

    return (
      <Pressable
        ref={ref}
        style={styleFn}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      >
        {children}
      </Pressable>
    );
  },
);

export default PressableWithFeedback;
