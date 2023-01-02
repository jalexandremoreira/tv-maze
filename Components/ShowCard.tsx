import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { HeartEmpty, HeartFull } from '../Components/Icons';
import { Theme } from '../theme';

interface Props {
  id?: number;
  img?: string;
  network?: string;
  title?: string;
}

export default function ShowCard({ id, img, network, title }: Props) {
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const linkTo = useLinkTo();

  //   const getStoredData = async () => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem('favorites');
  //       return jsonValue !== null ? JSON.parse(jsonValue) : null;
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   };

  //   React.useEffect(() => {
  //     const storedData: number[] = [];

  //     getStoredData().then((data) => data && storedData.push(data));

  //     storedData.filter((storedId: number) => storedId === id);
  //   }, []);

  const { colors, border, font } = Theme;

  const FavoriteButton = () => (
    <Pressable onPress={() => setIsFavorite(!isFavorite)}>
      {isFavorite ? (
        <HeartFull size={16} color={colors.white.main} />
      ) : (
        <HeartEmpty size={16} color={colors.white.main} />
      )}
    </Pressable>
  );

  return (
    <Pressable
      onPress={() => {
        id && linkTo(`/show/${id}`);
      }}
      style={{
        borderColor: colors.white.main,
        borderRadius: border.radius,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 15,
        overflow: 'hidden',
        width: '48%',
      }}
    >
      <View
        style={{
          backgroundColor: colors.black,
          borderRadius: 50,
          margin: 10,
          padding: 6,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      >
        <FavoriteButton />
      </View>

      {img ? (
        <Image
          style={{
            width: '100%',
            height: 233,
          }}
          resizeMode="contain"
          source={{
            uri: img,
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            height: 233,
            backgroundColor: colors.white.main,
          }}
        />
      )}

      <View
        style={{
          alignItems: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
        }}
      >
        {title && (
          <Text
            style={{
              color: colors.white.main,
            }}
          >
            {title}
          </Text>
        )}
        {network && (
          <Text
            style={{
              color: colors.white.main,
            }}
          >
            {network}
          </Text>
        )}
      </View>
    </Pressable>
  );
}