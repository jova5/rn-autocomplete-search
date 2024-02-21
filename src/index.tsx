import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';
import {AutocompleteSearch} from "./components/AutocompleteSearch/AutocompleteSearch";

const LINKING_ERROR =
  `The package 'rn-autocomplete-search' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type RnAutocompleteSearchProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'RnAutocompleteSearchView';

export const RnAutocompleteSearchView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<RnAutocompleteSearchProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export const RNAutocompleteSearch = AutocompleteSearch;
