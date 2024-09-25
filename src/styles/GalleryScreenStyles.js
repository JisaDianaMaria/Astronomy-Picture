import { StyleSheet } from 'react-native';

const galleryStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },

  imageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  image: {
    width: 150,
    height: 150,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  button: {
    backgroundColor: '#800080', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  
  disabledButton: {
    backgroundColor: '#cccccc',  
  },

  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  filterButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#800080',
    alignItems: 'center',
    borderRadius: 5,
  },

  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default galleryStyles;
