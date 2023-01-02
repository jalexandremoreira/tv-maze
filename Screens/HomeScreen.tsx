import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLinkTo } from '@react-navigation/native';

import { fetchShows, fetchCast, fetchCrew } from '../api';
import { TvShow } from '../types';

interface Props {
  score?: number;
  show?: TvShow;
}

export default function HomeScreen() {
  const [shows, setShows] = React.useState<Props[] | null>(null);

  const linkTo = useLinkTo();

  React.useEffect(() => {
    fetchShows('BreaKing BAd').then((data) => setShows(data));
  }, []);

  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
      }}
    >
      <StatusBar style="auto" />

      {shows ? (
        shows.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              linkTo(`/show/${item?.show?.id}`);
            }}
          >
            <Text>{item?.show?.name}</Text>
          </Pressable>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
