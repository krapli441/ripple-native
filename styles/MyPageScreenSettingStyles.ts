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
    padding: 5,
  },
  settingContainer: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  settingItemContainer: {
    width:"85%",
    marginBottom: 20,
    alignSelf:"center",
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  settingDescription: {
    fontSize: 14,
    color: 'gray',
  },
  settingTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
