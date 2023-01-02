import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

import { fetchShows, fetchCast, fetchCrew } from '../api';
import { Theme } from '../theme';
import { TvShow } from '../types';

interface Props {
  score?: number;
  show?: TvShow;
}

export default function HomeScreen() {
  const [shows, setShows] = React.useState<Props[] | null>(null);
  const [searchInput, setSearchInput] = React.useState<string | null>(null);

  const { colors, border, font } = Theme;

  const linkTo = useLinkTo();

  const paddingH = 10;
  const paddingV = 5;

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'flex-start',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-start',
          margin: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <TextInput
            placeholder="type the name of a show"
            onChangeText={setSearchInput}
            value={searchInput ?? ''}
            placeholderTextColor={colors.white[100]}
            style={{
              borderColor: colors.white.main,
              borderRadius: border.radius,
              borderWidth: 1,
              color: colors.white[100],
              flex: 1,
              fontSize: font.size.md,
              marginRight: 10,
              paddingHorizontal: paddingH,
              paddingVertical: paddingV,
            }}
          />
          <Pressable
            accessibilityLabel="search for a tv show button"
            onPress={() => {
              console.log(searchInput);

              searchInput
                ? fetchShows(searchInput).then((data) => setShows(data))
                : null;
            }}
            style={{
              backgroundColor: colors.white.main,
              paddingHorizontal: paddingH,
              paddingVertical: paddingV,
              borderWidth: 1,
              borderColor: colors.white.main,
              borderRadius: border.radius,
            }}
          >
            <Text
              style={{
                color: colors.black,
                fontSize: font.size.md,
              }}
            >
              search
            </Text>
          </Pressable>
        </View>

        {shows ? (
          shows.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                linkTo(`/show/${item?.show?.id}`);
              }}
            >
              <Text
                style={{ color: colors.white.main, fontSize: font.size.md }}
              >
                {item?.show?.name}
              </Text>
            </Pressable>
          ))
        ) : (
          <Text style={{ color: colors.white.main, fontSize: font.size.md }}>
            Loading...
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
