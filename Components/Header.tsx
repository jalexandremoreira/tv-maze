import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

import { HeartEmpty, HeartFull } from './Icons';
import { Theme } from '../theme';
import { useStoredFavorites } from '../hooks/useStoredFavorites';

export default function Header({
  handleShowFavorites,
}: {
  handleShowFavorites?: () => void;
}) {
  const linkTo = useLinkTo();
  const { getStoredData } = useStoredFavorites();
  const [favorites, setFavorites] = React.useState<number[] | null>(null);

  React.useEffect(() => {
    getStoredData().then((data) => {
      data ? setFavorites(data) : setFavorites(null);
    });
  }, []);

  const { colors, font } = Theme;

  return (
    <View
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
      }}
    >
      <Pressable onPress={() => linkTo('/home')}>
        <Text
          style={{
            color: colors.white.main,
            fontFamily: font.family.header,
            fontSize: font.size.title,
          }}
        >
          TV MAZE
        </Text>
      </Pressable>

      {handleShowFavorites &&
        (favorites && favorites.length > 0 ? (
          <Pressable onPress={handleShowFavorites}>
            <HeartFull color={colors.white.main} size={40} />
          </Pressable>
        ) : (
          <HeartEmpty color={colors.white.main} size={40} />
        ))}
    </View>
  );
}
