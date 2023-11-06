import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
  },

  inputStyle: {
    height: 40, // Set the height of the input
    margin: 12, // Add some margin around the input
    borderWidth: 1, // Add a border to the input
    padding: 10, // Add some padding inside the input
    borderRadius: 20, // Round the corners of the input
  },
});

export default styles;
