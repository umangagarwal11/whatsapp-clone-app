import { StyleSheet } from "react-native";
import layout from '../../constants/Layout';

const styles = StyleSheet.create({
    message_recieved: {
        margin: '1%',
        marginLeft: '5%',
        padding: '1%',
        width: 'auto',
        minWidth: '25%',
        maxWidth: '75%',
        backgroundColor: 'whitesmoke',
        borderRadius: 7.5,
        alignSelf: 'flex-start'
    },
    message_recieved_span:{
        alignSelf: 'flex-end',
        marginTop: 10,
        fontSize: 12,
    },
    message_sent: {
        margin: '1%',
        marginRight: '5%',
        padding: '1%',
        width: 'auto',
        minWidth: '25%',
        maxWidth: '75%',
        backgroundColor: 'yellowgreen',
        borderRadius: 7.5,
        alignSelf: 'flex-end'
    },
    message_sent_span: {
        alignSelf: 'flex-end',
        marginTop: 10,
        fontSize: 12,
    },
    
});

export default styles;