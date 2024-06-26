import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// 동적 스타일을 반환하는 함수
export const getDynamicStyles = () => {
  return StyleSheet.create({
    button: {
      width: width < 350 ? 150 : 200,
    },
    container: {
      padding: height < 667 ? 10 : 20,
    },
    // 기타 스타일 정의...
  });
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    marginTop: '6%',
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
  },
  resultItem: {
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 30,
    marginRight: 30,
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
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
