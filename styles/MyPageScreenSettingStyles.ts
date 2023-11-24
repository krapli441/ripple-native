import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingDescription: {
    fontSize: 16,
    flex: 7, // 텍스트 영역을 더 크게 설정
    flexWrap: 'wrap', // 텍스트가 길어질 경우 줄바꿈
  },
});

export default styles;
