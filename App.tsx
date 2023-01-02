import React from 'react';
// import ReactDOM from 'react-dom/client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { TvShow } from './types';

export default function App() {
  const [tv, setTv] = React.useState<TvShow | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);

  const fetchTV = async (show: string) => {
    const parsedShow = show.trim().toLowerCase().replace(' ', '%20');
    return await fetch(
      `https://api.tvmaze.com/singlesearch/shows?q=${parsedShow}`
    ).then((response) => response.json());
  };

  const fetchCast = async (id: number) => {
    return await fetch(`https://api.tvmaze.com/shows/${id}/cast`).then(
      (response) => response.json()
    );
  };

  const fetchCrew = async (id: number) => {
    return await fetch(`https://api.tvmaze.com/shows/${id}/crew`).then(
      (response) => response.json()
    );
  };

  React.useEffect(() => {
    fetchTV('better call saul').then((data) => setTv(data));
  }, []);

  React.useEffect(() => {
    tv?.id && fetchCast(tv.id).then((data) => setCast(data));
    tv?.id && fetchCrew(tv.id).then((data) => setCrew(data));
  }, [tv]);

  console.log(cast);
  console.log(crew);

  const Show = ({ show }: { show?: TvShow }) => {
    const regex = /(<([^>]+)>)/gi;

    return (
      <View style={{ marginBottom: '5px' }}>
        <Text>{show?.name}</Text>
        <Text>{show?.summary?.replace(regex, '')}</Text>
        {show?.network && <Text>{show?.network?.name}</Text>}
        {show?.webChannel && <Text>{show?.webChannel?.name}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {tv ? <Show show={tv} /> : <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
