import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    padding: 15,
    zIndex: 1,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 40,
    bottom: 150,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    fontSize: 30,
    color: '#000',
  },
  calloutStyle: {
    width: 300, // 콜아웃의 너비
    minHeight: 120, // 최소 높이
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexWrap: 'wrap', // 내용이 넘치면 다음 줄로 넘어가게 설정
  },
  calloutView: {
    width: '100%', // 콜아웃 뷰의 전체 너비 사용
    alignItems: 'flex-start', // 가로축에서 시작 위치에 아이템 정렬
  },
  title: {
    fontSize: 16, // 제목 폰트 크기
    fontWeight: 'bold', // 글씨 두께
    color: '#333', // 글씨 색상
  },
  artist: {
    fontSize: 14, // 아티스트 폰트 크기
    color: '#666', // 글씨 색상
  },
  tagContainer: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5, // 상단 여백
  },
  tagText: {
    alignSelf: 'center',
    color: 'gray', // 태그 배경색
    padding: 2, // 태그 내부 패딩
    fontSize: 10, // 태그 폰트 크기
  },

  calloutButtonText: {
    fontSize: 11,
    textAlign: 'center',
    alignItems: 'center',
  },
  calloutLikeButtonText: {
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    flexShrink: 1, // 내용이 넘치면 줄이도록 설정
  },
  artistText: {
    fontSize: 10,
    fontWeight: '300',
    color: 'gray',
    flexShrink: 1, // 내용이 넘치면 줄이도록 설정
  },
  calloutButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 12,
  },
  secondRow: {
    flexDirection: 'row',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  trackInfo: {
    marginLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
  },
  thirdRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calloutLikeButton: {
    width: '48%',
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  calloutSpotifyButton: {
    width: '48%',
    padding: 10,
    backgroundColor: '#1DB954',
    borderRadius: 10,
  },
  buttonLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
