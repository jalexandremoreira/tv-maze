import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Theme } from '../theme';
import { TvShow } from '../types';
import { fetchShows } from '../api';

interface Props {
  score?: number;
  show?: TvShow;
}

export default function HomeScreen() {
  const [shows, setShows] = React.useState<Props[] | null>(null);
  const [searchInput, setSearchInput] = React.useState<string | null>(null);

  const { colors } = Theme;

  const handleSearch = () => {
    searchInput
      ? fetchShows(searchInput).then((data) => {
          setShows(data);
        })
      : null;
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
      <Header />
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          // flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: 20,
        }}
      >
        <SearchBar
          handleSearch={handleSearch}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />

        {shows && (
          <View
            style={{
              display: 'flex',
              marginTop: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {shows.map((item, index) => (
              <ShowCard
                key={index}
                id={item?.show?.id}
                img={item?.show?.image?.medium || item?.show?.image?.original}
                network={
                  item?.show?.network?.name || item?.show?.webChannel?.name
                }
                title={item?.show?.name}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
