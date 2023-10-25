import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 30,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#EDEDE9',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  mapButton: {
    backgroundColor: '#EDEDE9',
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    marginLeft: 10,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 80,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;