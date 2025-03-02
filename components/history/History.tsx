import { View, Text } from "react-native"
import { useGlobalState } from '../../context/GlobalStateContext';

import historyStyles from "./styles";

const History = ({ route, navigation}: any) => {
    const { globalState, refreshData } = useGlobalState();
    

    return (
        <View style={historyStyles.backgroumd}>
            <Text style={{color: "white", position: 'absolute', 'top': 180}}>Coming Soon👅👅</Text>
        </View>
    );
}

export default History;