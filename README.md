# It does not work

# rn-autocomplete-search

Search component with autocomplete feature.

This search component tries to simulate behavior of
web search component.

## Installation

```sh
npm install rn-autocomplete-search
```

## Important

Only for android.

<span style="font-size:0.6em;">You always can try on iOS</span>

## Demo
<img src="rn-autocomplete-demo.gif" width="360" height="720"/>

## Usage

```js
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import {RNAutocompleteSearch} from "rn-autocomplete-search";
import type {Data} from "./common/Common";

const data: Data[] = [
  {id: '1', text: 'Lorem Ipsum'},
  {id: '2', text: 'Random Text'}
]

const App = () => {
  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <RNAutocompleteSearch
        data={data}
        textInputPlaceholder={'Search'}
        noResultInfo={"No result"}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{display: "flex"}}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    display: 'flex',
    backgroundColor: '#ffffff'
  },
});

export default App;
```

## Required packages

Latest [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons?source=post_page---------------------------)

## Params

| Parameter                     | Required | Value                                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                                                      |
|-------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| data                          | True     | Data[]                                                                                                                                                      | Data that will be shown in dropdown of autocomplete.<br/><pre>type Data = {<br/> id: string,<br/> text: string<br/>}</pre>                                                                                                                                                                                                                       |
| textInputPlaceholder          | True     | string                                                                                                                                                      | Place holder in search part.                                                                                                                                                                                                                                                                                                                     |
| noResultInfo                  | True     | string                                                                                                                                                      | Place holder in case of no results found.                                                                                                                                                                                                                                                                                                        |
| onSelectRecommendation        | False    | ```(item: Data) => void```                                                                                                                                  | Callback that is called when you select item from recommendation modal. Item is one record from required data.                                                                                                                                                                                                                                   |
| returnKeyType                 | False    | ReturnKeyTypeOptions                                                                                                                                        | ReturnKeyTypeOptions for TextInput.                                                                                                                                                                                                                                                                                                              |
| onSubmitTextInput             | False    | ```(searchQuery: string) => void```                                                                                                                         | Callback that is called when the text input submit button is pressed. <br/> <br/>searchQuery: string <br/>- text from input                                                                                                                                                                                                                      |
| showLeftIcons                 | False    | boolean                                                                                                                                                     | Show left icons.                                                                                                                                                                                                                                                                                                                                 |
| showRightIcons                | False    | boolean                                                                                                                                                     | Show right icons.                                                                                                                                                                                                                                                                                                                                |
| leftIconSize                  | False    | number                                                                                                                                                      | Left icon size.                                                                                                                                                                                                                                                                                                                                  |
| rightIconSize                 | False    | number                                                                                                                                                      | Right icon size.                                                                                                                                                                                                                                                                                                                                 |
| leftIcon                      | False    | string                                                                                                                                                      | Name of react-native-vector-icon from MaterialCommunityIcons. This icon will be shown before focus on input, on left side.                                                                                                                                                                                                                       |
| leftIconAfterPress            | False    | string                                                                                                                                                      | Name of react-native-vector-icon from MaterialCommunityIcons. This icon will be shown after focus on input, on left side.                                                                                                                                                                                                                        |
| rightIcon                     | False    | string                                                                                                                                                      | Name of react-native-vector-icon from MaterialCommunityIcons. This icon will be shown before focus on input, on right side.                                                                                                                                                                                                                      |
| rightIconAfterPress           | False    | string                                                                                                                                                      | Name of react-native-vector-icon from MaterialCommunityIcons. This icon will be shown before focus on input, on right side.                                                                                                                                                                                                                      |
| leftIconColor                 | False    | string                                                                                                                                                      | Left icons color in hexadecimal format.                                                                                                                                                                                                                                                                                                          |
| rightIconColor                | False    | string                                                                                                                                                      | Right icons color in hexadecimal format.                                                                                                                                                                                                                                                                                                         |
| onLeftIconPress               | False    | ```() => void```                                                                                                                                            | Callback that is called when left icon is pressed.                                                                                                                                                                                                                                                                                               |
| onLeftFocusIconPress          | False    | ```() => void```                                                                                                                                            | When in focus, different left icon will be shown. Callback that is called when left icon (when in focus) is pressed.                                                                                                                                                                                                                             |
| onRightIconPress              | False    | ```() => void```                                                                                                                                            | Callback that is called when right icon is pressed.                                                                                                                                                                                                                                                                                              |
| onRightFocusIconPress         | False    | ```() => void```                                                                                                                                            | When in focus, different right icon will be shown. Callback that is called when right icon (when in focus) is pressed.                                                                                                                                                                                                                           |
| LeftIcon                      | False    | ```() => ReactElement```                                                                                                                                    | Custom left icon. If you want to use your custom icon, you pass it here.                                                                                                                                                                                                                                                                         |
| LeftIconAfterPress            | False    | ```() => ReactElement```                                                                                                                                    | Custom left icon when in focus (after press). If you want to use your custom icon, you pass it here.                                                                                                                                                                                                                                             |
| RightIcon                     | False    | ```() => ReactElement```                                                                                                                                    | Custom right icon. If you want to use your custom icon, you pass it here.                                                                                                                                                                                                                                                                        |
| RightIconAfterPress           | False    | ```() => ReactElement```                                                                                                                                    | Custom right icon when in focus (after press). If you want to use your custom icon, you pass it here.                                                                                                                                                                                                                                            |
| onTextInputFocus              | False    | ```() => void```                                                                                                                                            | When you focus on input, passed callback is called.                                                                                                                                                                                                                                                                                              |
| onTextInputBlur               | False    | ```() => void```                                                                                                                                            | When you leave input focus, passed callback is called.                                                                                                                                                                                                                                                                                           |
| textInputPlaceholderColor     | False    | string                                                                                                                                                      | Text input placeholder color in hexadecimal format.                                                                                                                                                                                                                                                                                              |
| textInputColor                | False    | string                                                                                                                                                      | Text input color in hexadecimal format.                                                                                                                                                                                                                                                                                                          |
| textInputStyle                | False    | StyleProp<TextStyle>                                                                                                                                        | Customize text input style.                                                                                                                                                                                                                                                                                                                      |
| searchBarStyle                | False    | StyleProp<TextStyle>                                                                                                                                        | Customize search bar style.                                                                                                                                                                                                                                                                                                                      |
| offsetRecommendation          | False    | number                                                                                                                                                      | When you start typing, recommendation modal will be shown. This number sets how much offset in vertical line will modal be separated from search bar.                                                                                                                                                                                            |
| recommendationStyle           | False    | StyleProp<ViewStyle>                                                                                                                                        | Customize recommendation style modal.                                                                                                                                                                                                                                                                                                            |
| recommendationItemStyle       | False    | StyleProp<ViewStyle>                                                                                                                                        | Recommendation modal is contained by list of items. With this parameter you customize recommendation item style.                                                                                                                                                                                                                                 |
| recommendationItemTextStyle   | False    | StyleProp<TextStyle>                                                                                                                                        | Recommendation modal is contained by list of items. With this parameter you customize recommendation item style.                                                                                                                                                                                                                                 |
| RecommendationItem            | False    | <pre>({ item, searchQuery, onPress } : <br/>{<br/>  item: Data,<br/>  searchQuery: string,<br/>  onPress: (item: Data) => void<br/>}) => ReactElement</pre> | You can customize your own recommendation item inside recommendation modal.<br/> <br/>item: Data <br/>- item (id: string, text: string) that will be rendered, or text that will be shown <br/><br/>searchQuery: string <br/>- text from input <br/> <br/>onPress: (item: Data) => void <br/>- function that will be called when item is pressed |
| recommendationItemRippleColor | False    | string                                                                                                                                                      | Recommendation item ripple color in hexadecimal format.                                                                                                                                                                                                                                                                                          |
| textBoldStyle                 | False    | StyleProp<TextStyle>                                                                                                                                        | Customize bolded text in recommendation item.                                                                                                                                                                                                                                                                                                    |
| textNormalStyle               | False    | StyleProp<TextStyle>                                                                                                                                        | Customize normal text in recommendation item.                                                                                                                                                                                                                                                                                                    |
| recommendationSeparatorStyle  | False    | StyleProp<ViewStyle>                                                                                                                                        | All recommendation items are separated with thin line. With this parameter you can custime recommendation itme separator.                                                                                                                                                                                                                        |

## Contributing

I welcome all recommendations and improvements.

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the
development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
