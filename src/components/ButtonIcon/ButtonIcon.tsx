import React, {type ReactElement} from "react";
import {StyleSheet, TouchableNativeFeedback, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {hexToRGBA} from "../common/Common";

export const ButtonIcon = (
    {
      icon,
      iconColor,
      size,
      disabled,
      onPress,
      testID = 'icon-button',
      Icon
    }: {
      icon?: string,
      iconColor?: string,
      size?: number,
      disabled?: boolean,
      onPress: () => void,
      testID?: string,
      Icon?: () => ReactElement
    }
) => {

  if (icon == undefined && Icon == undefined) {
    throw Error("ButtonIcon: Icon name (icon) must be defined, or Icon element must be passed");
  }

  if (icon != undefined && Icon != undefined) {
    throw Error("ButtonIcon: Only icon name or Icon element can be defined at same time");
  }

  if (Icon == undefined && iconColor == undefined && size == undefined) {
    throw Error("ButtonIcon: iconColor and size must be defined");
  }

  if (Icon != undefined && (iconColor != undefined || size != undefined)){
    throw Error("ButtonIcon: when Icon is defined then iconColor and size must be undefined");
  }

  const buttonSize = (size ?? (Icon ? Icon().props.size : 25)) + 2 * 8;
  const borderRadius = buttonSize / 2;
  const defaultIconColor = hexToRGBA(iconColor, 0.5);

  return (
      <View style={[
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: borderRadius,
        },
        disabled && styles.disabled
      ]}>
        <TouchableNativeFeedback
            testID={`${testID}-container`}
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(
              defaultIconColor ?? (Icon ? Icon().props.color : '#808080'),
                true,
                borderRadius
            )}
            disabled={disabled}
        >
          <View
              style={[styles.touchable, {borderRadius}]}
              testID={testID}
          >
            {
              Icon ?
                  Icon()
                  :
                  <MaterialIcons name={icon!} size={size} color={iconColor}/>
            }
          </View>
        </TouchableNativeFeedback>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    margin: 6,
    elevation: 0,
  },
  touchable: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.32,
  },
});
