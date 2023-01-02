import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

import { fetchShows, fetchCast, fetchCrew } from '../api';
import Header from '../Components/Header';
import { Theme } from '../theme';
import { TvShow } from '../types';
import SearchBar from '../Components/SearchBar';

interface Props {
  score?: number;
  show?: TvShow;
}

export default function HomeScreen() {
  const [shows, setShows] = React.useState<Props[] | null>(null);
  const [searchInput, setSearchInput] = React.useState<string | null>(null);

  const { colors, font } = Theme;

  const linkTo = useLinkTo();

  const handleSearch = () => {
    searchInput ? fetchShows(searchInput).then((data) => setShows(data)) : null;
  };

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-start',
          padding: 20,
          width: '100%',
        }}
      >
        <Header />

        <SearchBar
          handleSearch={handleSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        {shows &&
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
          ))}
      </View>
    </SafeAreaView>
  );
}
