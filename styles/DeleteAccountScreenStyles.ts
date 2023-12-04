import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  myRippleImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  infoBox: {
    width: '80%',
    backgroundColor: '#191414',
    borderRadius: 10,
    padding: 30,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    width:300,
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonActive: {
    backgroundColor: '#191414',
  },
  buttonInactive: {
    backgroundColor: 'grey',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxSize: {
    transform: [{scaleX: 0.7}, {scaleY: 0.7}], // 크기를 1.5배로 조정
  },
  checkboxLabel: {
    marginLeft: 8,
    // 레이블 텍스트 스타일
  },
  
});

export default styles;
