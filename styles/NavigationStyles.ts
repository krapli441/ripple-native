import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 120,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1,
    position: 'absolute', // <-- Add this line
    bottom: 0, // <-- Add this line
    left: 0, // <-- Add this line
    right: 0, // <-- Add this line
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
  },
  textStyle: {
    marginTop: 10,
  },
});

export default styles;