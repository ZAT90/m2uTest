import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    homeView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    addDetailView: {  backgroundColor: Colors.white, },
    listItemView: { padding: 20, width },
    listItemText: { fontWeight: 'bold' },
    listItemText2: { marginTop: 5 },
    viewDetailTitle: { marginLeft: 15, color: Colors.blue600 },
    viewDetailItem: { width: width - 20, minHeight: 40, borderRadius: 15, borderColor: 'black', borderWidth: 1, justifyContent: 'center', paddingLeft: 5, marginTop: 10 },
    dividerView: {backgroundColor: Colors.blue600, height: 2, flex: 1, alignSelf: 'center'},
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 50,
        backgroundColor: Colors.black
      },
});

export default styles;