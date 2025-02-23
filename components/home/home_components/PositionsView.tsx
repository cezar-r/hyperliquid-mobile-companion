import React from "react";
import { View } from "react-native";

import { PositionCell } from "./PositionsCell";

interface PositionsViewProps {
    positions: any[];
    isBalanceHidden: boolean;
    onCellPress: (ticker: string) => void;
}

export const PositionsView: React.FC<PositionsViewProps> = ({
    positions,
    isBalanceHidden,
    onCellPress,
}) => {
    return (
        <View>
            {positions.map((item: any, index: any) => {
                return (
                    <PositionCell
                        key={item.position.coin}
                        item={item}
                        index={index}
                        isBalanceHidden={isBalanceHidden}
                        onCellPress={() => onCellPress(item.position.coin)}
                    />
                )
            })}
        </View>
    );
}