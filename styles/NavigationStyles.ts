import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: 'auto',
    height: '13%',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: '#ccc',
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: -3}, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 10,
  },
});

export default styles;
