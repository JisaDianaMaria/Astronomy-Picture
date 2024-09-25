import React, { useEffect, useState } from 'react'; 
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/GalleryScreenStyles';

const getCurrentWeekDates = () => {
    const today = moment();
    return Array(7)
        .fill(0)
        .map((_, index) => moment(today).subtract(index, 'days').format('YYYY-MM-DD'))
        .reverse();
};

const GalleryScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data, error, favorites, favoritesData } = useSelector((state) => state.gallery);
    const [dates, setDates] = useState(getCurrentWeekDates());
    const [activeImage, setActiveImage] = useState(null);
    const [showFavorites, setShowFavorites] = useState(false);

    const earliestDate = '2024-01-01';
    const latestDate = moment().format('YYYY-MM-DD');
    const isPreviousDisabled = dates[0] === earliestDate;
    const isNextDisabled = dates[dates.length - 1] === latestDate;

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites);
                    dispatch({ type: 'FETCH_FAVORITES_SUCCESS', payload: parsedFavorites });

                    for (const date of parsedFavorites) {
                        dispatch({ type: 'FETCH_GALLERY_REQUEST', payload: { dates: [date] } });
                    }
                }
            } catch (error) {
                console.error('Error loading favorites', error);
            }
        };
        loadFavorites();

        dispatch({ type: 'FETCH_GALLERY_REQUEST', payload: { dates } });
    }, [dates]);

    const handleToggleFavorite = (date) => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: date });
    };

    const goToNextWeek = () => {
        setDates(dates.map((date) => moment(date).add(7, 'days').format('YYYY-MM-DD')));
    };

    const goToPreviousWeek = () => {
        setDates(dates.map((date) => moment(date).subtract(7, 'days').format('YYYY-MM-DD')));
    };

    const currentWeekData = dates
        .map(date => data[date])  
        .filter(item => item);    

    const displayedData = showFavorites
        ? Object.values(favoritesData)
        : currentWeekData;

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedData}
                keyExtractor={(item, index) => `${item.date}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Details', {
                                imageUrl: item.url,
                                title: item.title,
                                copyright: item.copyright,
                                explanation: item.explanation,
                                date: item.date,
                            })
                        }
                        onPressIn={() => setActiveImage(item.date)}
                        onPressOut={() => setActiveImage(null)}
                        style={[
                            styles.imageContainer,
                            activeImage === item.date
                        ]}
                    >
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Image source={{ uri: item.url }} style={styles.image} />
                        <TouchableOpacity
                            onPress={() => handleToggleFavorite(item.date)}
                            style={styles.favoriteIconContainer}
                        >
                            <Icon
                                name={favorites.includes(item.date) ? 'heart' : 'heart-outline'}
                                size={24}
                                color={favorites.includes(item.date) ? 'red' : 'gray'}
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            {!showFavorites && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={goToPreviousWeek}
                        style={[styles.button, isPreviousDisabled && styles.disabledButton]}
                        disabled={isPreviousDisabled}
                    >
                        <Text style={styles.buttonText}>Previous Week</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={goToNextWeek}
                        style={[styles.button, isNextDisabled && styles.disabledButton]}
                        disabled={isNextDisabled}
                    >
                        <Text style={styles.buttonText}>Next Week</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity
                onPress={() => setShowFavorites(!showFavorites)}
                style={styles.filterButton}
            >
                <Text style={styles.filterButtonText}>
                    {showFavorites ? 'Show All' : 'Show Favorites'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default GalleryScreen;