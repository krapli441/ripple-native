import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
    padding: 15,
    zIndex: 1,
  },
  errorMessage: {
    fontSize: 18,
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    right: 40,
    bottom: 150,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  addButtonText: {
    fontSize: 30,
    color: '#000',
  },
});

export default styles;
