import React from 'react';
import { Text, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/DetailsScreenStyles';

const DetailsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.gallery);

  const { imageUrl, title, copyright, explanation, date } = route.params; 

  const isFavorite = favorites.includes(date);

  const handleToggleFavorite = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: date });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      {copyright && <Text style={styles.copyright}>© {copyright}</Text>}
      <Text style={styles.explanation}>{explanation}</Text>

      <View style={styles.favoriteButtonContainer}>
        <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={30}
            color={isFavorite ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;