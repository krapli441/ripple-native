import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    justifyContent: 'center', // 중앙 정렬로 변경
    padding: 20, // 내부 여백 추가
  },
  headerContainer: {
    alignSelf: 'flex-start', // 좌측 정렬로 변경
    marginBottom: 40, // 헤더와 이미지 사이의 간격 조정
    marginLeft: 50,
  },
  headerText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left', // 좌측 정렬로 변경
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, // 이미지와 버튼 사이의 간격 조정
  },
  logo: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  nextButton: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 20,
    borderRadius: 30,
    alignSelf: 'center', // 버튼을 가운데 정렬
  },
  nextButtonText: {
    color: '#191414',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트를 버튼 중앙에 정렬
  },
  descriptionContainer: {
    alignItems: 'center', // 중앙 정렬
  },
  descriptionText: {
    color: 'white', // 텍스트 색상
    fontSize: 14, // 텍스트 크기
    fontWeight: 'normal', // 글씨 굵기
    textAlign: 'center', // 텍스트 중앙 정렬
  },
});

export default styles;
