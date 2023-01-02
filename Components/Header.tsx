import React from 'react';
import { View, Text } from 'react-native';

import { Theme } from '../theme';

export default function Header() {
  const { colors, border, font } = Theme;
  return (
    <View
      style={{
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginVertical: 15,
        width: '100%',
      }}
    >
      <Text
        style={{
          color: colors.white.main,
          fontFamily: font.family.header,
          fontSize: font.size.title,
        }}
      >
        TV MAZE
      </Text>
      <Text
        style={{
          color: colors.white.main,
        }}
      >
        heart
      </Text>
    </View>
  );
}
