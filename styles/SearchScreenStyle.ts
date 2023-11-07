import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  },
  flexContainer: {
    flex: 1, // 이 스타일을 KeyboardAvoidingView에 적용
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
    flexDirection: 'row', // 아이템을 수평으로 배치합니다.
    marginVertical: 10, // 상하 여백을 줍니다.
    alignItems: 'center', // 아이템을 중앙에 배치합니다.
    marginLeft: 30, // 왼쪽 여백을 줍니다.
    marginRight: 20, // 오른쪽 여백을 줍니다.
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 120, // 하단 내비게이션 바의 높이에 맞춰 조절하세요.
  },
  albumCover: {
    width: 60, // 이미지의 너비를 설정합니다.
    height: 60, // 이미지의 높이를 설정합니다.
    borderRadius: 5, // 이미지를 원형으로 만듭니다.
    marginRight: 20, // 오른쪽 여백을 줍니다.
  },
  infoContainer: {
    flex: 1, // 나머지 공간을 모두 사용합니다.
    justifyContent: 'center', // 중앙에 배치합니다.
  },
  title: {
    fontSize: 16, // 제목의 글자 크기를 설정합니다.
    fontWeight: 'bold', // 글자를 굵게 합니다.
  },
  artist: {
    fontSize: 14, // 아티스트 정보의 글자 크기를 설정합니다.
    color: 'gray', // 글자 색을 회색으로 합니다.
  },
  link: {
    fontSize: 14,
    color: 'black',
    marginRight: 20,
  },
});

export default styles;
