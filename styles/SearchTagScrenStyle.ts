import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    backgroundColor: '#f8f9fa',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 70,
    marginLeft: 30,
  },
  headerHelpText: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'left',
    marginTop: 0,
    marginLeft: 30,
    marginBottom:10,
  },
  tagsContainer: {
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
    flexWrap: 'wrap',
    padding: 25,
    paddingTop: 0,
    marginBottom: 15,
  },
  inputStyle: {
    height: 66,
    margin: 28,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
  },
  tag: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    marginHorizontal: 4, // 좌우 마진
    marginBottom: 4,
  },
  tagText: {
    textAlign: 'center',
    fontSize: 16,
  },
  completeButton: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    marginBottom: 100,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#191414',
  },

  completeButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
});

export default styles;
