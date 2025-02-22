/**
 * 
 * <ScrollView 
                style={searchStyles.resultsContainer}
                keyboardShouldPersistTaps="handled"  // This allows interaction with items while keyboard is open
            >
                {searchQuery === '' ? (
                    <>
                        <View style={searchStyles.recentHeaderContainer}>
                            <Text style={searchStyles.sectionTitle}>Recent Searches</Text>
                            {recentSearches.length > 0 && (
                                <TouchableOpacity 
                                    onPress={async () => {
                                        await AsyncStorage.removeItem('recentSearches');
                                        setRecentSearches([]);
                                    }}
                                >
                                    <AntDesign name="closecircle" size={15} color={Colors.LIGHT_GRAY} />
                                </TouchableOpacity>
                            )}
                        </View>
                       
                            {recentSearches.map(ticker => {
                                const tickerData = perpsTickerList.find(item => item.ticker === ticker);
                                if (tickerData) {
                                    return renderTickerCell(tickerData);
                                }
                                return null;
                            })}
              
                    </>
                ) : (
                    <View style={searchStyles.searchResultContainer}>
                        {getFilteredTickers().map(item => renderTickerCell(item))}
                    </View>
                )}
            </ScrollView>
 */