import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },

  tagsContainer: {
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    flexWrap: 'wrap',
    padding: 25,
    paddingTop: 0,
    marginBottom: 15,
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
  },
  flexContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tagText: {
    textAlign: 'center',
    fontSize: 16,
  },
  tag: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    marginHorizontal: 4, // 좌우 마진
    marginBottom: 4,
  },

  completeButton: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#191414',
  },

  completeButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  inputStyle: {
    height: 66,
    margin: 28,
    marginBottom: 15,
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
});

export default styles;
