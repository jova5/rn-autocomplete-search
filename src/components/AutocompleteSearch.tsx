import React, {type ReactElement, useEffect, useRef, useState} from "react";
import {
  type ReturnKeyTypeOptions,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextStyle,
  View,
  type ViewStyle
} from "react-native";
import ButtonIcon from "./ButtonIcon";
import RecommendationModal from "./RecommendationModal";
import type {Data} from "./common/Common";

const AutocompleteSearch = (
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
    recommendationItemRippleColor,
    textBoldStyle,
    textNormalStyle,
    recommendationSeparatorStyle,
    RecommendationItem,
    noResultInfo,
    onSelectRecommendation,
    returnKeyType,
    onSubmitTextInput,
    animated = true,
    animateOpenDuration,
    animateCloseDuration
  }: {
    data: Data[],
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
        item: Data,
        searchQuery: string,
        onPress: (item: Data) => void,
      }) => ReactElement,
    recommendationItemRippleColor?: string,
    textBoldStyle?: StyleProp<TextStyle>,
    textNormalStyle?: StyleProp<TextStyle>,
    recommendationSeparatorStyle?: StyleProp<ViewStyle>
    noResultInfo: string,
    onSelectRecommendation?: (item: Data) => void,
    returnKeyType?: ReturnKeyTypeOptions,
    onSubmitTextInput?: (searchQuery: string) => void,
    animated?: boolean,
    animateOpenDuration?: number,
    animateCloseDuration?: number
  }) => {

  const [searchInFocus, setSearchInFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<TextInput>(null);
  const searchBarRef = useRef<View>(null);
  const [searchBarCoordinateInfo, setSearchBarCoordinateInfo] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });

  useEffect(() => {
    setTimeout(() => {
      if (searchBarRef.current) {
        searchBarRef.current.measure((_fx, _fy, width, height, px, py) => {
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

      setTimeout(() => {
        setSearchQuery("");
      }, animateCloseDuration ? animateCloseDuration + 100 : 800);
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

  const onSelectSuggestion = (item: Data) => {

    searchIsOutOfFocusWithoutClear();

    setTimeout(() => {
      setSearchQuery(item.text);
    }, animateOpenDuration ? animateOpenDuration + 100 : 200);

    if (onSelectRecommendation) {
      onSelectRecommendation(item);
    }
  }

  const handleOnSubmitTextInput = () => {

    if (onSubmitTextInput) {
      onSubmitTextInput(searchQuery);
    }
  }

  function getLeftSideSearchInFocus() {
    return LeftIconAfterPress ?
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
      />;
  }

  function getLeftSideSearchOutOfFocus() {
    return LeftIcon ?
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
      />;
  }

  function getLeftSideSearchFocus() {
    return searchInFocus ? getLeftSideSearchInFocus() : getLeftSideSearchOutOfFocus();
  }

  function getRightSideSearchInFocus() {
    return RightIconAfterPress ?
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
      />;
  }

  function getRightSideSearchOutOfFocus() {
    return RightIcon ?
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
      />;
  }

  function getRightSideSearchFocus() {
    return searchInFocus ?
      getRightSideSearchInFocus()
      :
      getRightSideSearchOutOfFocus();
  }

  return (
    <React.Fragment>
      <View
        ref={searchBarRef}
        style={[styles.search, searchBarStyle]}>
        <View style={{justifyContent: 'center', marginLeft: 2}}>
          {
            showLeftIcons ? getLeftSideSearchFocus() : <></>
          }
        </View>

        <TextInput
          ref={searchInputRef}
          style={
            [{color: textInputColor ?? 'black', flex: 1,}, textInputStyle]}
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
            showRightIcons ? getRightSideSearchFocus() : <></>
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
        recommendationItemRippleColor={recommendationItemRippleColor}
        textBoldStyle={textBoldStyle}
        textNormalStyle={textNormalStyle}
        recommendationSeparatorStyle={recommendationSeparatorStyle}
        animated={animated}
        animateOpenDuration={animateOpenDuration}
        animateCloseDuration={animateCloseDuration}
      />
    </React.Fragment>
  )
}

export default AutocompleteSearch;

const styles = StyleSheet.create({
  search: {
    display: 'flex',
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
