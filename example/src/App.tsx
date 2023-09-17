import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { AutocompleteSearch } from 'rn-autocomplete-search';

export default function App() {
  return (
    <View style={styles.container}>
      <AutocompleteSearch data={[]} textInputPlaceholder={'Search...'} noResultInfo={'No results'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
