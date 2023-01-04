import AsyncStorage from '@react-native-async-storage/async-storage';
import { includes } from 'lodash';

export const useStoredFavorites = () => {
  const favoritesKey = '@favorites';

  const getStoredData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(favoritesKey);
      return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (value: number) => {
    getStoredData().then((data) => {
      if (includes(data, value)) {
        const filteredData = data.filter(
          (storedId: number) => storedId !== value
        );
        try {
          const jsonValue = JSON.stringify(filteredData);
          AsyncStorage.setItem(favoritesKey, jsonValue);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const jsonValue = JSON.stringify([...data, value]);
          AsyncStorage.setItem(favoritesKey, jsonValue);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  return { getStoredData, storeData };
};
