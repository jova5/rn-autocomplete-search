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

export const RecommendationItem = (
    {
      item,
      searchQuery,
      onPress,
      recommendationItemStyle,
      recommendationItemTextStyle
    }: {
      item: any,
      searchQuery: string,
      onPress: (item: any) => void,
      recommendationItemStyle?: StyleProp<ViewStyle>,
      recommendationItemTextStyle?: StyleProp<TextStyle>,
    }) => {
  const textLowerCase = item.text.toLowerCase();
  const queryLowerCase = searchQuery.toLowerCase();

  const parts = item.text.split('');
  const startIndex = textLowerCase.indexOf(queryLowerCase);
  const endIndex = startIndex + queryLowerCase.length - 1;

  return (
      <View
          style={[styles.suggestion, recommendationItemStyle]}>
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                'grey',
                true
            )}
            onPress={() => onPress(item)}
        >
          <View style={[styles.touchable]}>
            <Text style={[{marginLeft: 40}, recommendationItemTextStyle]}>
              {parts.map((part: string, index: number) => {
                if (index >= startIndex && index <= endIndex) {
                  return (
                      <Text
                          key={`bold_${index}`}
                          style={{
                            fontWeight: "800",
                            fontSize: 16,
                            color: '#1F2937'
                          }}>
                        {part}</Text>
                  );
                } else {
                  return (
                      <Text
                          key={`normal_${index}`}
                          style={{
                            fontWeight: "400",
                            fontSize: 16,
                            // @ts-ignore
                            color: "black"
                          }}>
                        {part}</Text>);
                }
              })}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
  )
}

const styles = StyleSheet.create({
  suggestion: {
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    elevation: 0,
    backgroundColor: 'white'
  },
  touchable: {
    flexGrow: 1,
  },
});
