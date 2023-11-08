import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 25,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
  },
  tagText: {
    textAlign: 'center',
  },
  moreButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    backgroundColor: 'darkgray', // 예시 색상
  },
  moreButtonText: {
    textAlign: 'center',
    color: 'black',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
  },
  tagHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    marginLeft: 30,
  },
  resultItem: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 30,
    marginRight: 20,
    marginTop: 30,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  albumCover: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
});

export default styles;
