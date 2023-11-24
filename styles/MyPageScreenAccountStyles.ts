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
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  deleteAccountText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;
