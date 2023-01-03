import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { includes } from 'lodash';

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
  const { getItem, setItem } = useAsyncStorage('@favorites');

  const getStoredData = async () => {
    try {
      const jsonValue = await getItem();
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value: number) => {
    getStoredData().then((data) => {
      if (includes(data, value)) {
        const filteredData = data.filter(
          (storedId: number) => storedId !== value
        );
        try {
          const jsonValue = JSON.stringify(filteredData);
          setItem(jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const jsonValue = JSON.stringify([...data, value]);
          setItem(jsonValue);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  React.useEffect(() => {
    getStoredData().then((data) => {
      if (id && includes(data, id)) {
        setIsFavorite(true);
      }
    });
  }, []);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    id && storeData(id);
  };

  const { colors, border, font } = Theme;

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
      <Pressable
        onPress={handleFavorite}
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
        {isFavorite ? (
          <HeartFull size={18} color={colors.white.main} />
        ) : (
          <HeartEmpty size={18} color={colors.white.main} />
        )}
      </Pressable>

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
              fontWeight: 'bold',
              fontSize: font.size.h5,
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
