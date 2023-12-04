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
    backgroundColor: '#191414',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    marginBottom: 5,
  },
});

export default styles;
