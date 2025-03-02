import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "../styles";
import Colors from "../../../styles/colors";
import { useGlobalState } from '../../../context/GlobalStateContext';
import { formatNumber } from "../../../common/helpers";
import { AVAILABLE_BALANCE_LABEL, CLOSE_ALL_TEXT, HIDDEN_NUMBER } from "../constants";



interface PositionsHeaderProps {
    isClosingAll: boolean;
    isBalanceHidden: boolean;
    onCloseAllPress: () => void;
}

export const PositionsHeader: React.FC<PositionsHeaderProps> = ({
    isClosingAll,
    isBalanceHidden,
    onCloseAllPress,
}) => {
    const { globalState } = useGlobalState();
    const availableBalance = globalState.userState?.perps.withdrawable;

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.availableBalanceContainer}>
                <Text style={styles.availableBalanceLabel}>{AVAILABLE_BALANCE_LABEL}</Text>
                <Text style={styles.availableBalanceAmount}>{isBalanceHidden ? HIDDEN_NUMBER : "$"+formatNumber(availableBalance, 2)}</Text>
            </View>

            <View>
            {isClosingAll ? (
                    <ActivityIndicator color={Colors.FG_1} size="small" />
                ) : (
                    <TouchableOpacity>
                        <Text style={styles.closeAllText} onPress={onCloseAllPress}>
                            {CLOSE_ALL_TEXT}
                        </Text>
                    </TouchableOpacity>
            )}
            </View>
        </View>
    );
}