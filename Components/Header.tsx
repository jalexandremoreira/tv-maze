import React from 'react';
import { Pressable, View, Text } from 'react-native';

import { HeartFull } from './Icons';
import { Theme } from '../theme';

export default function Header({
  handleShowFavorites,
}: {
  handleShowFavorites?: () => void;
}) {
  const { colors, font } = Theme;

  return (
    <View
      style={{
        alignItems: 'baseline',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
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

      <Pressable onPress={handleShowFavorites}>
        <HeartFull color={colors.white.main} size={40} />
      </Pressable>
    </View>
  );
}
