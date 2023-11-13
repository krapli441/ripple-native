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
  customCallout: {
    position: 'absolute',
    alignItems: 'flex-start',
    width: '80%', // 너비를 고정값으로 설정
    height: 'auto',
    top: '32%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },

  calloutInfo: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  calloutRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
    marginBottom: 20,
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
  calloutStyle: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    width: 250,
    maxHeight: 200,
  },
  calloutView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: 200,
  },
  calloutArtist: {
    fontSize: 14,
    color: 'grey',
    maxWidth: 200,
  },
  tagContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap', // 내용이 넘치면 다음 줄로 넘어가게 설정
    maxWidth: 280, // customCallout 너비에서 padding을 고려한 값으로 설정
  },
  tagText: {
    color: 'gray',
    borderRadius: 10,
    padding: 3,
    fontSize: 10,
    maxWidth: 80,
  },
});

export default styles;
