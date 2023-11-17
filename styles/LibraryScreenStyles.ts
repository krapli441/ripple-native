import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  searchContainer: {
    flex:1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
    marginBottom: 30,
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
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 20,
  },
  flatListStyle: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  flatListContent: {
    paddingBottom: 120,
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    height: 80,
    padding: 20,
    alignSelf: 'center',
    backgroundColor: '#191414',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  },
  menuCount: {
    fontSize: 18,
    color: 'grey',
  },
  menuImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  menuTextContainer: {
    flexDirection: 'column',
  },
  menuIcon: {
    marginLeft: 2,
    marginRight: 13,
    // 기타 스타일 설정
  },
});

export default styles;
