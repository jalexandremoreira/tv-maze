import React from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';

import { Theme } from '../theme';

interface Props {
  searchInput: string | null;
  setSearchInput: React.Dispatch<React.SetStateAction<string | null>>;
  handleSearch: () => void;
}

export default function SearchBar({
  searchInput,
  setSearchInput,
  handleSearch,
}: Props) {
  const { colors, border, font } = Theme;

  const paddingH = 10;
  const paddingV = 5;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <TextInput
        placeholder="type the name of a show"
        onChangeText={setSearchInput}
        value={searchInput ?? ''}
        placeholderTextColor={colors.white[100]}
        style={{
          borderColor: colors.white.main,
          borderRadius: border.radius,
          borderWidth: 1,
          color: colors.white[100],
          flex: 1,
          fontSize: font.size.md,
          marginRight: 10,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
        }}
      />
      <Pressable
        accessibilityLabel="search for a tv show button"
        onPress={handleSearch}
        style={{
          backgroundColor: colors.white.main,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          borderWidth: 1,
          borderColor: colors.white.main,
          borderRadius: border.radius,
        }}
      >
        <Text
          style={{
            color: colors.black,
            fontSize: font.size.md,
          }}
        >
          search
        </Text>
      </Pressable>
    </View>
  );
}
