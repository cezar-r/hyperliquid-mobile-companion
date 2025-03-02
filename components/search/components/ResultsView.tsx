import { View, Text, ScrollView } from "react-native";

import styles from "../styles";
import { TickerData } from "../../../common/types";
import { getFilteredTickers } from "../helpers";
import { RecentSearchesHeader } from "./RecentSearchesHeader";
import { NO_RESULTS_LABEL } from "../constants";

interface ResultViewProps {
    searchQuery: string,
    recentSearches: string[],
    perpsTickerList: TickerData[],
    onClearRecentSearchesPress: () => void,
    renderTickerCell: (tickerData: TickerData) => React.JSX.Element,
}

export const ResultView: React.FC<ResultViewProps> = ({
    searchQuery,
    recentSearches,
    perpsTickerList,
    onClearRecentSearchesPress,
    renderTickerCell,
}) => {
    return (
        <ScrollView 
            style={styles.resultsContainer}
            keyboardShouldPersistTaps="handled"  // this allows interaction with items while keyboard is open
        >
            {searchQuery === '' ? (
                <View>
                    <RecentSearchesHeader
                        hasRecentSearches={recentSearches.length > 0}
                        onClearRecentSearchesPress={onClearRecentSearchesPress}
                    />
                    
                    {recentSearches.map(ticker => {
                        const tickerData = perpsTickerList.find(item => item.ticker === ticker);
                        if (tickerData) {
                            return <View key={ticker}>{renderTickerCell(tickerData)}</View>;
                        }
                        return null;
                    })}
            
                </View>
            ) : getFilteredTickers(searchQuery, perpsTickerList).length === 0 ? (
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