import * as React from 'react';
import { View, Image } from 'react-native';

export function Mapa() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={require('../resources/mapa-demo.png')} />
    </View>
  );
}
