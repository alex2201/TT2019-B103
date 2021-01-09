import * as React from 'react';
import { Image, View } from 'react-native';

export function Promociones() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'teal' }}>
      <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={require('../resources/ofertas-demo.png')} />
    </View>
  );
}
