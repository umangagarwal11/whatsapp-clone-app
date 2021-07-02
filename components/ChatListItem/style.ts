import { StyleSheet } from "react-native";
import layout from '../../constants/Layout';

const styles = StyleSheet.create({
    chat_list_item:{
        height: 0.1 * layout.window.height,
        padding: 0.03*layout.window.width,
        paddingBottom: 0.05*layout.window.width,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
        display: 'flex',
        flexDirection: 'row',
        width: layout.window.width,
    },
    chat_right: {
        padding: 2,
    },
    timestamp: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: '#555'
    },
    avatar:{
        borderRadius: 40,
        height: 60,
        width: 60,
        marginRight: 10,
    }
});

export default styles;