import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import Header from '../Components/Header';
import { RootStackParamList } from '../App';
import { fetchShowById, fetchCast, fetchCrew } from '../api';
import { TvShow } from '../types';
import { Theme } from '../theme';

export default function ShowScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'show'>>();

  const [show, setShow] = React.useState<TvShow | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);

  const id = params?.screen;
  const { colors } = Theme;

  React.useEffect(() => {
    fetchShowById(id).then((data) => setShow(data));
    fetchCast(id).then((data) => setCast(data));
    fetchCrew(id).then((data) => setCrew(data));
  }, []);

  const HTMLRegex = /(<([^>]+)>)/gi;

  const MainText = ({ children }: { children?: string }) => (
    <Text style={{ color: colors.white.main, fontSize: 16 }}>{children}</Text>
  );

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
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          // flex: 1,
          justifyContent: 'flex-start',
          padding: 20,
        }}
      >
        <Header />

        <View style={{ marginBottom: '5%' }}>
          <MainText>{show?.name}</MainText>
          <MainText>{show?.summary?.replace(HTMLRegex, '')}</MainText>
          {show?.network && <MainText>{show?.network?.name}</MainText>}
          {show?.webChannel && <MainText>{show?.webChannel?.name}</MainText>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
