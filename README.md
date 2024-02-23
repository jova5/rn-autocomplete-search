# It does not work
# rn-autocomplete-search

Search component with autocomplete feature.
I tried to make search component behave as
web search component.

## Caution
There is still lots of work to be done, but it is somewhat functional.

## Installation

```sh
npm install rn-autocomplete-search
```

## Usage

```js
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet
} from "react-native";
import { RNAutocompleteSearch } from "rn-autocomplete-search";

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

## Instructions / Details
Work in progress...

## Contributing

As it is still work in progress and I am still learning
I would like to finish this on my own before any
help from community.

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
