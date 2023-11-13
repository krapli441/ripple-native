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
    flexDirection: 'row', // 가로 방향 배치
    flexWrap: 'wrap', // 태그가 여러 줄로 나눠질 수 있도록 함
    marginTop: 5, // 상단 여백
  },
  tagText: {
    backgroundColor: '#e1e1e1', // 태그 배경색
    borderRadius: 10, // 태그 모서리 둥글기
    padding: 5, // 태그 내부 패딩
    marginHorizontal: 2, // 수평 여백
    fontSize: 12, // 태그 폰트 크기
  },
  calloutButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  // Callout 스타일
  calloutStyle: {
    width: 260, // 너비
    minHeight: 120, // 최소 높이
    backgroundColor: 'white', // 배경색
    borderRadius: 6, // 둥근 모서리
    padding: 10, // 내부 패딩
    alignItems: 'flex-start', // 좌측 정렬
    shadowColor: '#000', // 그림자 색상
    shadowOffset: {width: 0, height: 2}, // 그림자 위치
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 3.84, // 그림자 크기
  },

  // 사용자 정보 스타일
  userInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  // 앨범 커버 및 트랙 정보 스타일
  secondRow: {
    flexDirection: 'row', // 가로로 배열
    alignItems: 'center', // 가운데 정렬
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10, // 오른쪽 여백
  },
  trackInfo: {
    flex: 1, // 나머지 공간 차지
  },

  // 버튼 스타일
  thirdRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // 공간 균등 분배
    marginTop: 10,
  },

  // CalloutSubview 스타일
  calloutSubview: {
    backgroundColor: '#1DB954',
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
  calloutText: {
    fontSize: 14,
    color: 'white',
  },
});

export default styles;
