import * as React from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '../App';
import { fetchShowById, fetchCast, fetchCrew } from '../api';
import { TvShow } from '../types';
fetchShowById;

export default function ShowScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'show'>>();

  const [show, setShow] = React.useState<TvShow | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);

  React.useEffect(() => {
    fetchShowById(params?.screen).then((data) => setShow(data));
    fetchCast(params?.screen).then((data) => setCast(data));
    fetchCrew(params?.screen).then((data) => setCrew(data));
  }, []);

  const HTMLRegex = /(<([^>]+)>)/gi;

  return (
    <View
      style={{
        // minHeight: '100vh',
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        paddingTop: '20%',
      }}
    >
      <View style={{ marginBottom: '5%' }}>
        <Text>{show?.name}</Text>
        <Text>{show?.summary?.replace(HTMLRegex, '')}</Text>
        {show?.network && <Text>{show?.network?.name}</Text>}
        {show?.webChannel && <Text>{show?.webChannel?.name}</Text>}
      </View>
    </View>
  );
}
