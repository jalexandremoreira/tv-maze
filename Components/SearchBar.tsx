import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Close, Search } from './Icons';
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
  const [isFocused, setIsFocused] = React.useState(false);

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
          // backgroundColor: 'pink',
          borderColor: colors.white.main,
          borderRadius: border.radius,
          borderWidth: 1,
          color: colors.white[100],
          flex: 1,
          fontSize: font.size.h4,
          marginRight: 5,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
        }}
        keyboardAppearance="dark"
        returnKeyType="search"
        onSubmitEditing={handleSearch}
        onFocus={() => setIsFocused(true)}
        // onBlur={() => {
        //   console.log('onBlur');
        //   setIsFocused(false);
        // }}
      />

      {isFocused && searchInput && (
        <Pressable
          accessibilityLabel="clear text"
          onPress={() => {
            setSearchInput(null);
            // setIsFocused(false);
          }}
          style={{
            marginRight: 5,
          }}
        >
          <Close color={colors.white.main} size={34} />
        </Pressable>
      )}

      <Pressable
        accessibilityLabel="search for a tv show button"
        onPress={() => {
          setIsFocused(false);
          handleSearch();
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white.main,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          borderWidth: 1,
          borderColor: colors.white.main,
          borderRadius: border.radius,
        }}
      >
        {isFocused && searchInput ? (
          <Search color={colors.black} size={22} />
        ) : (
          <Text
            style={{
              color: colors.black,
              fontSize: font.size.h4,
            }}
          >
            search
          </Text>
        )}
      </Pressable>
    </View>
  );
}
