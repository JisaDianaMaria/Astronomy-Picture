import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/WelcomeScreenStyles';

const WelcomeScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const { data, error } = useSelector((state) => state.apod);

    useEffect(() => {
        dispatch({ type: 'FETCH_APOD_REQUEST' });
    }, []);


    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {data && (
                <>
                    <Text style={styles.title}>{data.title}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image source={{ uri: data.url }} style={styles.image} />
                    </TouchableOpacity>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <ScrollView>
                                    <Text style={styles.title}>{data.title}</Text>
                                    <Text style={styles.modalDescription}>{data.explanation}</Text>
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(false)}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Close</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Gallery')}
                    >
                        <Text style={styles.buttonText}>View Gallery</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default WelcomeScreen;
