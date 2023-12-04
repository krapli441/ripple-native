import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  notificationContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
    height: '87%',
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
    borderRadius: 5,
    marginRight: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // 수직 중앙 정렬
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 24,
    marginTop: 6,
  },
  notificationTextContainer: {
    flex: 1, // 텍스트 컨테이너가 가능한 모든 공간을 차지하도록 설정
    justifyContent: 'center', // 수직 중앙 정렬
  },
  deleteAction: {
    flex:1,
    backgroundColor: '#e63946',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
