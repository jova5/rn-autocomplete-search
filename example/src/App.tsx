import * as React from 'react';

import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import {AutocompleteSearch} from "../../src/components/AutocompleteSearch/AutocompleteSearch";
import ScrollView = Animated.ScrollView;

export default function App() {

  const data = [{id: '1', text: 'string'},{id: '2', text: 'string2'}]

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <AutocompleteSearch data={data} textInputPlaceholder={'Pretraga'} noResultInfo={'Nema rezultata'}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{display: "flex"}}>

        {/*<View style={{display: 'flex', flex: 1, backgroundColor: 'red'}}>*/}
        {/*  <Text>dsadasdasd</Text>*/}
        {/*</View>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 0,
    display: 'flex',
    backgroundColor: '#F9FAFB'
  },
});
