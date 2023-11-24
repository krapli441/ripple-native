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
});

export default styles;
