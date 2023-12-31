import React, {ReactElement, useEffect, useRef, useState} from "react";
import {
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";
import {RecommendationModal} from "../RecommendationModal/RecommendationModal";

export const AutocompleteSearch = (
    {
      data,
      onLeftIconPress,
      onLeftFocusIconPress,
      onRightIconPress,
      onRightFocusIconPress,
      onTextInputFocus,
      onTextInputBlur,
      leftIcon,
      leftIconAfterPress,
      rightIcon,
      rightIconAfterPress,
      leftIconColor,
      rightIconColor,
      textInputPlaceholder,
      textInputPlaceholderColor,
      textInputColor,
      leftIconSize,
      rightIconSize,
      LeftIcon,
      LeftIconAfterPress,
      RightIcon,
      RightIconAfterPress,
      textInputStyle,
      searchBarStyle,
      showLeftIcons = true,
      showRightIcons = false,
      offsetRecommendation,
      recommendationStyle,
      recommendationItemStyle,
      recommendationItemTextStyle,
      RecommendationItem,
      noResultInfo,
      onSelectRecommendation,
      returnKeyType,
      onSubmitTextInput,
    }: {
      data: { id?: string, text: string }[],
      onLeftIconPress?: () => void,
      onLeftFocusIconPress?: () => void,
      onRightIconPress?: () => void,
      onRightFocusIconPress?: () => void,
      onTextInputFocus?: () => void,
      onTextInputBlur?: () => void,
      leftIcon?: string,
      leftIconAfterPress?: string,
      rightIcon?: string,
      rightIconAfterPress?: string,
      leftIconColor?: string,
      rightIconColor?: string,
      textInputPlaceholder: string,
      textInputPlaceholderColor?: string,
      textInputColor?: string,
      leftIconSize?: number,
      rightIconSize?: number,
      LeftIcon?: () => ReactElement,
      LeftIconAfterPress?: () => ReactElement,
      RightIcon?: () => ReactElement,
      RightIconAfterPress?: () => ReactElement,
      textInputStyle?: StyleProp<TextStyle>,
      searchBarStyle?: StyleProp<ViewStyle>,
      showLeftIcons?: boolean,
      showRightIcons?: boolean,
      offsetRecommendation?: number,
      recommendationStyle?: StyleProp<ViewStyle>,
      recommendationItemStyle?: StyleProp<ViewStyle>,
      recommendationItemTextStyle?: StyleProp<TextStyle>,
      RecommendationItem?: (
          {
            item,
            searchQuery,
            onPress,
          }: {
            item: any,
            searchQuery: string,
            onPress: (item: any) => void,
          }) => ReactElement,
      noResultInfo: string,
      onSelectRecommendation?: (item: any) => void,
      returnKeyType?: ReturnKeyTypeOptions,
      onSubmitTextInput?: (searchQuery: string) => void,
    }) => {

  const [searchInFocus, setSearchInFocus] = useState(false);
  const [searchBarCoordinateInfo, setSearchBarCoordinateInfo] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<TextInput>(null);
  const searchBarRef = useRef<View>(null);

  useEffect(() => {
    setTimeout(() => {
      if (searchBarRef.current) {
        searchBarRef.current.measure((fx, fy, width, height, px, py) => {
          setSearchBarCoordinateInfo({
            x: px,
            y: py,
            width: width,
            height: height
          })
        })
      }
    }, 500);
  }, [searchBarRef.current])

  const searchIsInFocus = () => {
    setSearchInFocus(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  const searchIsOutOfFocus = () => {
    setSearchInFocus(false);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
      searchInputRef.current.clear();
      setSearchQuery("");
    }
  }

  const searchIsOutOfFocusWithoutClear = () => {
    if (onTextInputBlur) {
      onTextInputBlur();
    }
    setSearchInFocus(false);
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  }

  const onSelectSuggestion = (item: any) => {
    setSearchQuery(item.text);
    searchIsOutOfFocusWithoutClear();
    if (onSelectRecommendation) {
      onSelectRecommendation(item);
    }
  }

  const handleOnSubmitTextInput = () => {
    if (onSubmitTextInput) {
      onSubmitTextInput(searchQuery);
    }
  }

  return (
      <React.Fragment>
        <View
            ref={searchBarRef}
            style={[
              styles.search,
              searchBarStyle]}>
          <View style={{justifyContent: 'center'}}>
            {
              showLeftIcons ?
                  searchInFocus ?
                      LeftIconAfterPress ?
                          LeftIconAfterPress()
                          :
                          <ButtonIcon
                              icon={leftIconAfterPress ?? "arrow-left"}
                              size={leftIconSize ?? 25}
                              onPress={() => {
                                if (onLeftFocusIconPress) {
                                  onLeftFocusIconPress();
                                }
                                searchIsOutOfFocus()
                              }}
                              iconColor={leftIconColor ?? '#64748B'}
                          />
                      :
                      LeftIcon ?
                          LeftIcon()
                          :
                          <ButtonIcon
                              icon={leftIcon ?? "magnify"}
                              size={leftIconSize ?? 25}
                              onPress={() => {
                                if (onLeftIconPress) {
                                  onLeftIconPress();
                                }
                                searchIsInFocus()
                              }}
                              iconColor={leftIconColor ?? '#64748B'}
                          />
                  : <></>
            }
          </View>

          <TextInput
              ref={searchInputRef}
              style={
                [{
                  color: textInputColor ?? 'black',
                  flex: 1,
                }, textInputStyle]}
              onChangeText={(text) => setSearchQuery(text)}
              placeholder={textInputPlaceholder}
              placeholderTextColor={textInputPlaceholderColor ?? '#64748B'}
              onBlur={() => searchIsOutOfFocusWithoutClear()}
              onPressIn={() => {
                if (onTextInputFocus) {
                  onTextInputFocus();
                }
                setSearchInFocus(true);
              }}
              value={searchQuery}
              returnKeyType={returnKeyType ?? 'search'}
              onSubmitEditing={handleOnSubmitTextInput}
          />

          <View style={{justifyContent: 'center'}}>
            {
              showRightIcons ?
                  searchInFocus ?
                      RightIconAfterPress ?
                          RightIconAfterPress()
                          :
                          <ButtonIcon
                              icon={rightIconAfterPress ?? "close-circle-outline"}
                              size={rightIconSize ?? 25}
                              onPress={() => {
                                if (onRightFocusIconPress) {
                                  onRightFocusIconPress();
                                }
                                searchIsOutOfFocus()
                              }}
                              iconColor={rightIconColor ?? '#64748B'}
                          />
                      :
                      RightIcon ?
                          RightIcon()
                          :
                          <ButtonIcon
                              icon={rightIcon ?? "magnify"}
                              size={rightIconSize ?? 25}
                              onPress={() => {
                                if (onRightIconPress) {
                                  onRightIconPress();
                                }
                                searchIsInFocus()
                              }}
                              iconColor={rightIconColor ?? '#64748B'}
                          />
                  : <></>
            }
          </View>
        </View>
        <RecommendationModal
            data={data}
            open={searchInFocus}
            searchQuery={searchQuery}
            onSelectSuggestion={onSelectSuggestion}
            searchBarCoordinateInfo={searchBarCoordinateInfo}
            recommendationStyle={recommendationStyle}
            recommendationItemStyle={recommendationItemStyle}
            recommendationItemTextStyle={recommendationItemTextStyle}
            CustomRecommendationItem={RecommendationItem}
            noResultInfo={noResultInfo}
            offsetRecommendation={offsetRecommendation}
        />
      </React.Fragment>
  )
}

const styles = StyleSheet.create({
  search: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#CBD5E1',
  }
});
