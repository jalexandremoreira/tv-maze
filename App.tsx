import React from 'react';
// import ReactDOM from 'react-dom/client';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { fetchTV, fetchCast, fetchCrew } from './api';
import { TvShow } from './types';

interface Props {
  score?: number;
  show?: TvShow;
}

export default function App() {
  const [tv, setTv] = React.useState<Props[] | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);

  React.useEffect(() => {
    fetchTV('BreaKing BAd').then((data) => setTv(data));
  }, []);

  // React.useEffect(() => {
  //   tv?.id && fetchCast(tv.id).then((data) => setCast(data));
  //   tv?.id && fetchCrew(tv.id).then((data) => setCrew(data));
  // }, [tv]);

  console.log(tv);
  // console.log(crew);

  const Show = ({ show }: { show?: TvShow }) => {
    const HTMLRegex = /(<([^>]+)>)/gi;

    return (
      <View style={{ marginBottom: '5px' }}>
        <Text>{show?.name}</Text>
        <Text>{show?.summary?.replace(HTMLRegex, '')}</Text>
        {show?.network && <Text>{show?.network?.name}</Text>}
        {show?.webChannel && <Text>{show?.webChannel?.name}</Text>}
        <Text>------------</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {tv ? (
        tv.map((item, index) => <Show show={item?.show} key={index} />)
      ) : (
        <Text>Loading...</Text>
      )}
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
