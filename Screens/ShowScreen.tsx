import * as React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useLinkTo } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';

import Header from '../Components/Header';
import { Back } from '../Components/Icons';
import { RootStackParamList } from '../App';
import { fetchShowById, fetchCast, fetchCrew } from '../api';
import { TvShow } from '../types';
import { Theme } from '../theme';

export default function ShowScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'show'>>();

  const [show, setShow] = React.useState<TvShow | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);

  const linkTo = useLinkTo();

  const id = params?.screen;
  const { colors } = Theme;
  // const img = show?.image?.original || show?.image?.medium;
  const img = show?.image?.medium;
  const imgHeight = 500;

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
      <Header />
      <Pressable
        onPress={() => linkTo('/home')}
        style={{
          backgroundColor: colors.black,
          borderRadius: 50,
          elevation: 10,
          left: 20,
          padding: 6,
          position: 'absolute',
          top: Platform.OS === 'ios' ? 150 : 110,
          zIndex: 10,
        }}
      >
        <Back size={22} color={colors.white.main} />
      </Pressable>

      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={{
          alignItems: 'center',
          // flex: 1,
          justifyContent: 'flex-start',
        }}
      >
        {img ? (
          <Image
            source={{ uri: img }}
            style={{ height: imgHeight, width: '100%', zIndex: 10 }}
            // resizeMode="contain"
          />
        ) : (
          <View
            style={{
              width: '100%',
              height: imgHeight,
              backgroundColor: colors.white.main,
              zIndex: 10,
            }}
          />
        )}
        <View
          style={{
            padding: 20,
          }}
        >
          <MainText>{show?.name}</MainText>
          <MainText>{show?.summary?.replace(HTMLRegex, '')}</MainText>
          {show?.network && <MainText>{show?.network?.name}</MainText>}
          {show?.webChannel && <MainText>{show?.webChannel?.name}</MainText>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
