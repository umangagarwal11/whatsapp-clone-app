import { StyleSheet } from "react-native";
import colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        margin:10,
    },
    main:{
        flex:1,
        flexDirection: "row",
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 25,
        height: 'auto',
        maxHeight: 150
    },
    input:{
        flex: 1,
        color: "black"
    },
    send:{
        color: colors.light.text,
        backgroundColor: colors.light.tint,
        borderRadius: 40,
        marginLeft:5,
        height:45,
        width:45,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    }
});

export default styles;