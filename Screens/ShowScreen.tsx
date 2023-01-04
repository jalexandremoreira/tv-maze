import * as React from 'react';
import {
  Image,
  Linking,
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
import {
  Back,
  HeartEmpty,
  HeartFull,
  OpenLink,
  Share,
} from '../Components/Icons';
import { RootStackParamList } from '../App';
import { fetchShowById, fetchCast, fetchCrew } from '../api';
import { TvShow } from '../types';
import { Theme } from '../theme';

export default function ShowScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, 'show'>>();

  const [show, setShow] = React.useState<TvShow | null>(null);
  const [cast, setCast] = React.useState<any | null>(null);
  const [crew, setCrew] = React.useState<any | null>(null);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  const linkTo = useLinkTo();

  const id = params?.screen;
  const { colors, font } = Theme;
  const img = show?.image?.original || show?.image?.medium;
  const imgHeight = 500;

  React.useEffect(() => {
    fetchShowById(id).then((data) => setShow(data));
    fetchCast(id).then((data) => setCast(data));
    fetchCrew(id).then((data) => setCrew(data));
  }, []);

  const HTMLRegex = /(<([^>]+)>)/gi;

  const HStack = ({ children }: any) => (
    <View
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      {children}
    </View>
  );

  const HeaderText = ({ children }: any) => (
    <Text style={{ color: colors.white.main, fontSize: font.size.h4 }}>
      {children}
    </Text>
  );

  const MainText = ({ children }: any) => (
    <Text style={{ color: colors.white.main, fontSize: font.size.h5 }}>
      {children}
    </Text>
  );

  const Badge = ({ children }: { children: string }) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.white.main,
        borderRadius: 50,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          color: colors.white.main,
          fontSize: font.size.main,
        }}
      >
        {children}
      </Text>
    </View>
  );

  const styles = {
    buttons: {
      padding: 6,
      borderWidth: 1,
      borderColor: colors.white.main,
      borderRadius: 50,
    },
    text: {
      color: colors.white.main,
    },
  };

  const network = show?.network?.name || show?.webChannel?.name;
  const networkLink =
    show?.network?.officialSite || show?.webChannel?.officialSite;
  const creators = crew?.filter((item: any) => item.type === 'Creator');
  const actors = cast?.slice(0, 4);

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
            width: '100%',
          }}
        >
          <HStack>
            <Text
              style={{
                ...styles.text,
                fontSize: font.size.h1,
                fontWeight: 'bold',
                maxWidth: '80%',
              }}
            >
              {show?.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <Pressable
                style={{ ...styles.buttons, marginRight: 10 }}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <HeartFull size={22} color={colors.white.main} />
                ) : (
                  <HeartEmpty size={22} color={colors.white.main} />
                )}
              </Pressable>

              <Pressable
                style={styles.buttons}
                onPress={() => console.log('sharing')}
              >
                <Share size={22} color={colors.white.main} />
              </Pressable>
            </View>
          </HStack>

          {network || show?.rating?.average ? (
            <HStack>
              {network ? (
                <Pressable
                  onPress={() => networkLink && Linking.openURL(networkLink)}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <View style={{ marginRight: 8 }}>
                    <HeaderText>{network}</HeaderText>
                  </View>

                  {networkLink && (
                    <OpenLink color={colors.white.main} size={15} />
                  )}
                </Pressable>
              ) : null}

              {show?.rating?.average ? (
                <HeaderText>
                  rating&nbsp;{show?.rating?.average?.toString()}
                </HeaderText>
              ) : null}
            </HStack>
          ) : null}

          {show?.premiered || show?.language ? (
            <HStack>
              {show?.premiered ? (
                <View style={{ marginRight: 8 }}>
                  <HeaderText>
                    {show?.premiered.split('-')[0]}&nbsp;-&nbsp;
                    {show?.ended ? show?.ended.split('-')[0] : ''}
                  </HeaderText>
                </View>
              ) : null}

              {show?.language ? (
                <HeaderText>
                  lang:&nbsp;{show?.language.toLocaleLowerCase()}
                </HeaderText>
              ) : null}
            </HStack>
          ) : null}

          {show?.genres ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 20,
              }}
            >
              {show?.genres?.map((genre: string, index) => (
                <Badge key={index}>{genre}</Badge>
              ))}
            </View>
          ) : null}

          {show?.summary ? (
            <MainText>{show?.summary?.replace(HTMLRegex, '')}</MainText>
          ) : null}

          {show?.summary ? (
            <View
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: colors.white.main,
                marginVertical: 20,
              }}
            />
          ) : null}

          {creators && creators.length > 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 10,
                width: '100%',
              }}
            >
              <MainText>Created by:&nbsp;</MainText>
              {creators.map((creator: any, index: number) => (
                <MainText key={index}>{creator.person.name}</MainText>
              ))}
            </View>
          ) : null}

          {actors && actors.length > 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 10,
                width: '100%',
              }}
            >
              <MainText>Starring:&nbsp;</MainText>
              {actors.map((actor: any, index: number) => (
                <MainText key={index}>
                  {actor.person.name}
                  {index !== actors.length - 1 && ', '}
                </MainText>
              ))}
            </View>
          ) : null}

          {!show?.ended &&
          show?.schedule?.days &&
          show.schedule.days.length > 0 ? (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 10,
                width: '100%',
              }}
            >
              <MainText>Released on&nbsp;</MainText>

              {show?.schedule.days?.map((day: string, index) => (
                <MainText key={index}>
                  {day}s
                  {show?.schedule?.days &&
                    show.schedule.days.length > 1 &&
                    show.schedule.days.length === index - 1 &&
                    'and '}
                </MainText>
              ))}

              {show?.schedule?.time ? (
                <MainText>&nbsp;at&nbsp;</MainText>
              ) : null}

              {show?.schedule?.time ? (
                <MainText>{show?.schedule?.time}</MainText>
              ) : null}
            </View>
          ) : null}

          {show?.averageRuntime ? (
            <MainText>
              Average runtime:&nbsp;{show?.averageRuntime.toString()}min
            </MainText>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
