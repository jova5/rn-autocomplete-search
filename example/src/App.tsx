import * as React from 'react';

import {Animated, SafeAreaView, StyleSheet} from 'react-native';
import {RNAutocompleteSearch} from "../../src/components/RNAutocompleteSearch/RNAutocompleteSearch";
import ScrollView = Animated.ScrollView;
import {data} from "./data";

export default function App() {

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <RNAutocompleteSearch
        data={data}
        textInputPlaceholder={'Search'}
        noResultInfo={'No results'}
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
