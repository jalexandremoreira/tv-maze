import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import Header from '../Components/Header';
import SearchBar from '../Components/SearchBar';
import ShowCard from '../Components/ShowCard';
import { Theme } from '../theme';
import { TvShow } from '../types';
import { fetchShows, fetchShowById } from '../api';
import { useStoredFavorites } from '../hooks/useStoredFavorites';

export default function HomeScreen() {
  const [shows, setShows] = React.useState<TvShow[] | null>(null);
  const [searchInput, setSearchInput] = React.useState<string | null>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const { getStoredData } = useStoredFavorites();

  const { colors } = Theme;

  const onRefresh = React.useCallback(() => {
    console.log(searchInput);
    setRefreshing(true);
    searchInput ? onSearch() : onShowFavorites();
    setRefreshing(false);
  }, []);

  const onSearch = () => {
    setShows(null);

    searchInput
      ? fetchShows(searchInput)
          .then((data) => {
            data.map((datum: { show: TvShow; score: number }) => {
              // matching the API response to the TvShow type
              setShows((prevShows) => [...(prevShows || []), datum.show]);
            });
          })
          .catch(function (error) {
            console.log(
              'There has been a problem with your fetch operation:',
              error.message
            );
            throw error;
          })
      : null;
  };

  const onShowFavorites = () => {
    setShows(null);

    getStoredData().then((data: number[]) => {
      data.map((storedId: number) => {
        fetchShowById(storedId.toString())
          // fetching each show by id
          .then((show: TvShow) => {
            setShows((prevShows) => [...(prevShows || []), show]);
          })
          .catch(function (error) {
            console.log(
              'There has been a problem with your fetch operation:',
              error.message
            );
          });
      });
    });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <Header handleShowFavorites={onShowFavorites} />
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
        refreshControl={
          <RefreshControl
            tintColor={colors.white.main}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <SearchBar
          handleSearch={onSearch}
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
                id={item?.id}
                img={item?.image?.medium || item?.image?.original}
                network={item?.network?.name || item?.webChannel?.name}
                title={item?.name}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
