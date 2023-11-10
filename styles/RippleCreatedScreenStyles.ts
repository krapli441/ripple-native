import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '85%',
    height: '63%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  searchContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
    marginBottom: 20,
  },
  inputStyle: {
    height: 66,
    margin: 28,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
  },
  resultItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 20,
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 120,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
  completeButton: {
    width: '85%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1DB954',
    borderRadius: 25,
    margin: 20,
  },
});

export default styles;
