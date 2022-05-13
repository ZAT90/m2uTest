import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({

    homeView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    listItemView: { padding: 20, width },
    listItemText: { fontWeight: 'bold' },
    listItemText2: { marginTop: 5 }
});

export default styles;