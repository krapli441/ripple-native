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
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 24,
  },
});

export default styles;
