import { View, Text, ScrollView } from "react-native";

import styles from "../styles";
import { TickerData } from "../../../common/types";
import { getFilteredTickers } from "../helpers";
import { NO_RESULTS_LABEL } from "../constants";

interface ResultViewProps {
    searchQuery: string,
    perpsTickerList: TickerData[],
    renderTickerCell: (tickerData: TickerData) => React.JSX.Element,
}

export const ResultView: React.FC<ResultViewProps> = ({
    searchQuery,
    perpsTickerList,
    renderTickerCell,
}) => {
    return (
        <ScrollView 
            style={styles.resultsContainer}
            keyboardShouldPersistTaps="handled"
        >
            {getFilteredTickers(searchQuery, perpsTickerList).length === 0 ? (
                <Text style={styles.sectionTitle}>{NO_RESULTS_LABEL}</Text>
            ) : (
                <View>
                    {getFilteredTickers(searchQuery, perpsTickerList).map(item => (
                        <View key={item.ticker}>{renderTickerCell(item)}</View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
}