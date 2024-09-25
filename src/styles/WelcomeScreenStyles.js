import { StyleSheet } from 'react-native';

export const commonHeaderOptions = {
  headerStyle: { backgroundColor: '#800080' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerBackTitle: 'Back',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },

  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  modalDescription: {
    fontSize: 16,
    textAlign: 'justify',
  },

  button: {
    backgroundColor: '#800080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default styles;
