import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
    marginBottom: 30,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  rippleItem: {
    width: '85%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191414',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  rippleInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  rippleArtist: {
    fontSize: 12,
    color: 'grey',
  },
  spotifyButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1DB954', // Spotify 버튼 색상
    borderRadius: 20,
  },
  spotifyButtonText: {
    marginLeft: 5,
    fontSize: 15,
    color: 'white',
  },
  rippleDate: {
    color: 'gray', // 날짜 색상
    fontSize: 12, // 날짜 글꼴 크기
    marginBottom: 5, // 제목과의 여백
    // 기타 스타일 설정
  },
  rippleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    // flexShrink: 1,
  },
});

export default styles;
