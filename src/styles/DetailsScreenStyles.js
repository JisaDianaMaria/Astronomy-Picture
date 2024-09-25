import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  copyright: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#666',
  },
  explanation: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 20,
  },
  favoriteButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
