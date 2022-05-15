import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    homeView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    addDetailView: { flex: 1, alignItems: 'center', marginTop: 10 },
    listItemView: { padding: 20, width },
    listItemText: { fontWeight: 'bold' },
    listItemText2: { marginTop: 5 },
    viewDetailTitle: { marginLeft: 15, color: Colors.blue600 },
    viewDetailItem: { width: width - 20, height: 40, borderRadius: 15, borderColor: 'black', borderWidth: 1, justifyContent: 'center', paddingLeft: 15, marginTop: 10 }
});

export default styles;