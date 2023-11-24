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
  infoContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoBox: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  deleteAccountContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  deleteAccountLink: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default styles;
