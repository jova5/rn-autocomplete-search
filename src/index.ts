import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
  type StyleProp,
  type TextStyle,
  type ReturnKeyTypeOptions,
} from 'react-native';
import type { ReactElement } from 'react';

const LINKING_ERROR =
  `The package 'rn-autocomplete-search' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: '- You have run \'pod install\'\n', default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type AutocompleteSearchProps = {
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
};

const ComponentName = 'AutocompleteSearch';

export const AutocompleteSearch =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<AutocompleteSearchProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };
