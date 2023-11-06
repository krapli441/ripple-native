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
    marginLeft: 20, // 왼쪽 여백을 줍니다.
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
    fontSize: 14, // 링크의 글자 크기를 설정합니다.
    color: 'blue', // 글자 색을 파란색으로 합니다.
    marginRight: 20, // 오른쪽 여백을 줍니다.
  },
});

export default styles;
