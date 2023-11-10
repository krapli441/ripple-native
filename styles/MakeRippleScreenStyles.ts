import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
    paddingTop: 10,
    paddingBottom: 5,
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
  tagText: {
    textAlign: 'center',
    fontSize: 16,
  },
  moreButton: {
    width: 100,
    height: 40,
    marginLeft: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 4,
    backgroundColor: '#1DB954', // 예시 색상
  },
  moreButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
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
    marginTop: 10,
    marginLeft: 30,
  },
  tagHelpText: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 30,
  },
  rippleHelpText: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 30,
  },
  map: {
    marginTop: 20,
    alignSelf: 'center',
    width: '85%',
    height: '22%',
    borderRadius: 20,
    // ...StyleSheet.absoluteFillObject,
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
