import React, {type ReactElement, useEffect, useState} from "react";
import {
  Dimensions,
  FlatList,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle
} from "react-native";
import {RecommendationItem} from "../RecommendationItem/RecommendationItem";

const getRecommendationItem = (
    {
      CustomRecommendationItem,
      item,
      searchQuery,
      onPress,
      recommendationItemStyle,
      recommendationItemTextStyle,
    }: {
      CustomRecommendationItem?: (
          {
            item,
            searchQuery,
            onPress,
          }: {
            item: any,
            searchQuery: string,
            onPress: (item: any) => void,
          }) => ReactElement,

      item: any,
      searchQuery: string,
      onPress: (item: any) => void,
      recommendationItemStyle?: StyleProp<ViewStyle>,
      recommendationItemTextStyle?: StyleProp<TextStyle>,
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
          />
  )
}

export const RecommendationModal = (
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
    }: {
      data: { id?: string, text: string }[],
      open: boolean,
      searchQuery: string,
      onSelectSuggestion: (item: any) => void,
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
            item: any,
            searchQuery: string,
            onPress: (item: any) => void,
          }) => ReactElement,
      noResultInfo: string
    }) => {

  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    setFilteredData(
        data.filter(
            (value) =>
                value.text.toLowerCase().includes(searchQuery.toLowerCase())))
  }, [searchQuery]);

  useEffect(() => {
    if (!open) {
      setFilteredData(data);
    } else if (open && searchQuery != "") {
      setFilteredData(data.filter(
          (value) =>
              value.text.toLowerCase().includes(searchQuery.toLowerCase())))
    }
  }, [open]);

  const bellowYCoordinate = searchBarCoordinateInfo.y
      + searchBarCoordinateInfo.height
      + (offsetRecommendation ?? 0);

  return (
      <>
        {
            open &&
            <View
                style={[
                  styles.container,
                  {
                    top: bellowYCoordinate,
                    height: Dimensions.get('window').height * 0.38,
                    width: searchBarCoordinateInfo.width
                  },
                  recommendationStyle
                ]}
            >
              <View
                  style={
                    {
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'column'
                    }
                  }>
                <FlatList
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
                          recommendationItemTextStyle
                        })
                    }
                    ListEmptyComponent={
                      <Text style={[styles.suggestionEmpty, recommendationItemTextStyle]}>
                        {noResultInfo}
                      </Text>
                    }
                />
              </View>
            </View>
        }
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 100,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 10,
    margin: 10,
    marginTop: 0,
    elevation: 20,
    shadowColor: '#000000',
  },
  suggestion: {
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    elevation: 0,
    backgroundColor: 'white'
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
