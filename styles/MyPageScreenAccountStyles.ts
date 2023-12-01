import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    height: 60,
    padding: 20,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 18,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  deleteAccountText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  infoContainer: {
    marginVertical: 10,
    paddingHorizontal: 35,
  },
  infoHeader: {
    fontSize: 18,
    marginBottom: 12,
  },
  infoBox: {
    padding: 10,
    backgroundColor: '#191414',
    borderRadius: 20,
  },
  deleteAccountContainer: {
    paddingHorizontal: 20,
  },
  deleteAccountLink: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  logoutButton: {
    width: '80%', // 버튼의 너비를 조정
    paddingVertical: 10, // 버튼의 상하 패딩을 추가
    alignSelf: 'center', // 버튼을 가운데 정렬
    backgroundColor: 'gray',
    borderRadius: 20,
    marginTop: 20, // 계정 정보와의 간격 조정
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16, // 글자 크기 조정
  },
});

export default styles;
