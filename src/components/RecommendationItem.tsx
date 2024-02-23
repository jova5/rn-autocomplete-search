import React from "react";
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableNativeFeedback,
  View,
  type ViewStyle
} from "react-native";
import {hexToRGBA} from "./common/Common";

const RecommendationItem = (
    {
      item,
      searchQuery,
      onPress,
      recommendationItemStyle,
      recommendationItemTextStyle,
      recommendationItemRippleColor,
      textBoldStyle,
      textNormalStyle,
      recommendationSeparatorStyle
    }: {
      item: any,
      searchQuery: string,
      onPress: (item: any) => void,
      recommendationItemStyle?: StyleProp<ViewStyle>,
      recommendationItemTextStyle?: StyleProp<TextStyle>,
      recommendationItemRippleColor?: string,
      textBoldStyle?: StyleProp<TextStyle>,
      textNormalStyle?: StyleProp<TextStyle>,
      recommendationSeparatorStyle?: StyleProp<ViewStyle>,
    }) => {

  const textLowerCase = item.text.toLowerCase();
  const queryLowerCase = searchQuery.toLowerCase();
  const parts = item.text.split('');
  const startIndex = textLowerCase.indexOf(queryLowerCase);
  const endIndex = startIndex + queryLowerCase.length - 1;
  const defaultSelectColor = hexToRGBA('#808080', 0.5)

  return (
    <>
      <View style={[styles.suggestion, recommendationItemStyle]}>
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
              defaultSelectColor! ?? recommendationItemRippleColor, true,550
            )}
            onPress={() => onPress(item)}
        >
          <View style={[styles.touchable]}>
            <Text style={[{marginLeft: 48}, recommendationItemTextStyle]}>
              {parts.map((part: string, index: number) => {
                if (index >= startIndex && index <= endIndex) {
                  return (
                      <Text
                        key={`bold_${index}`}
                        style={[styles.boldedText, textBoldStyle]}
                      >{part}</Text>
                  );
                } else {
                  return (
                      <Text
                        key={`normal_${index}`}
                        style={[styles.normalText, textNormalStyle]}
                      >{part}</Text>
                  );
                }
              })}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={[styles.separator, recommendationSeparatorStyle]}/>
    </>
  )
}

export default RecommendationItem;

const styles = StyleSheet.create({
  suggestion: {
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 0,
    backgroundColor: 'white'
  },
  touchable: {
    flexGrow: 1,
  },
  boldedText: {
    fontWeight: "800",
    fontSize: 16,
    color: '#1F2937'
  },
  normalText: {
    fontWeight: "400",
    fontSize: 16,
    color: "black"
  },
  separator: {
    flex: 1,
    height: 0.5,
    backgroundColor: '#808080',
  }
});
