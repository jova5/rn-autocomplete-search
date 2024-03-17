import React, {type ReactElement, useEffect, useState} from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle
} from "react-native";
import RecommendationItem from "./RecommendationItem";
import type {Data} from "./common/Common";

const getRecommendationItem = (
  {
    CustomRecommendationItem,
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
    CustomRecommendationItem?: (
      {
        item,
        searchQuery,
        onPress,
      }: {
        item: Data,
        searchQuery: string,
        onPress: (item: Data) => void,
      }) => ReactElement,

    item: Data,
    searchQuery: string,
    onPress: (item: Data) => void,
    recommendationItemStyle?: StyleProp<ViewStyle>,
    recommendationItemTextStyle?: StyleProp<TextStyle>,
    recommendationItemRippleColor?: string,
    textBoldStyle?: StyleProp<TextStyle>,
    textNormalStyle?: StyleProp<TextStyle>,
    recommendationSeparatorStyle?: StyleProp<ViewStyle>
  }): ReactElement => {

  return (
    CustomRecommendationItem ?
      CustomRecommendationItem({
        item,
        searchQuery,
        onPress
      })
      :
      <RecommendationItem
        item={item}
        searchQuery={searchQuery}
        onPress={onPress}
        recommendationItemStyle={recommendationItemStyle}
        recommendationItemTextStyle={recommendationItemTextStyle}
        recommendationItemRippleColor={recommendationItemRippleColor}
        textBoldStyle={textBoldStyle}
        textNormalStyle={textNormalStyle}
        recommendationSeparatorStyle={recommendationSeparatorStyle}
      />
  )
}

const RecommendationModal = (
  {
    data,
    open,
    searchQuery,
    onSelectSuggestion,
    searchBarCoordinateInfo,
    offsetRecommendation,
    recommendationStyle,
    recommendationItemStyle,
    recommendationItemTextStyle,
    CustomRecommendationItem,
    noResultInfo,
    recommendationItemRippleColor,
    textBoldStyle,
    textNormalStyle,
    recommendationSeparatorStyle,
    animated = true,
    animateOpenDuration,
    animateCloseDuration
  }: {
    data: Data[],
    open: boolean,
    searchQuery: string,
    onSelectSuggestion: (item: Data) => void,
    searchBarCoordinateInfo: any,
    offsetRecommendation?: number,
    recommendationStyle?: StyleProp<ViewStyle>,
    recommendationItemStyle?: StyleProp<ViewStyle>,
    recommendationItemTextStyle?: StyleProp<TextStyle>,
    CustomRecommendationItem?: (
      {
        item,
        searchQuery,
        onPress,
      }: {
        item: Data,
        searchQuery: string,
        onPress: (item: Data) => void,
      }) => ReactElement,
    noResultInfo: string,
    recommendationItemRippleColor?: string,
    textBoldStyle?: StyleProp<TextStyle>,
    textNormalStyle?: StyleProp<TextStyle>,
    recommendationSeparatorStyle?: StyleProp<ViewStyle>,
    animated?: boolean,
    animateOpenDuration?: number,
    animateCloseDuration?: number
  }) => {

  const [filteredData, setFilteredData] = useState<Data[]>(data);
  const heightValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setFilteredData(
      data.filter(
        (value) =>
          value.text.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery]);

  const animateOpenModal = () => {
    Animated.timing(heightValue, {
      toValue: Dimensions.get('window').height * 0.38,
      duration: animateOpenDuration ?? 100,
      useNativeDriver: false
    }).start()
  }

  const animateCloseModal = () => {
    Animated.timing(heightValue, {
      toValue: 0,
      duration: animateCloseDuration ?? 100,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {

    if (open) {
      if (searchQuery == "") {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter(
          (value) =>
            value.text.toLowerCase().includes(searchQuery.toLowerCase())))
      }
      setTimeout(() => {
      }, 400);

      if (animated) {
        animateOpenModal()
      }
    } else {
      if (animated) {
        animateCloseModal()
      }
    }

  }, [open]);

  const bellowYCoordinate = searchBarCoordinateInfo.y
    + searchBarCoordinateInfo.height
    + (offsetRecommendation ?? 0);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: bellowYCoordinate,
          height: heightValue,
          width: searchBarCoordinateInfo.width
        },
        recommendationStyle
      ]}
    >
      <FlatList
        style={{margin: 10}}
        data={filteredData}
        keyExtractor={(_, index) => `recommended_item_${index}`}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
        renderItem={({item}) =>
          getRecommendationItem({
            CustomRecommendationItem,
            item,
            searchQuery,
            onPress: onSelectSuggestion,
            recommendationItemStyle,
            recommendationItemTextStyle,
            recommendationItemRippleColor,
            textBoldStyle,
            textNormalStyle,
            recommendationSeparatorStyle
          })
        }
        ListEmptyComponent={
          <Text style={[styles.suggestionEmpty, recommendationItemTextStyle]}>
            {noResultInfo}
          </Text>
        }
      />
    </Animated.View>
  )
}

export default RecommendationModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
    elevation: 20,
    shadowColor: '#000000',
  },
  suggestionEmpty: {
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    alignSelf: 'center'
  },
  touchable: {
    flexGrow: 1,
  },
});
