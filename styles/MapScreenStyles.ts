import { StyleSheet } from 'react-native';

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
});

export default styles;
