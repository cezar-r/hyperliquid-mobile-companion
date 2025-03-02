import { View, Text } from "react-native";

import styles from "../../../styles/place_order_sheet";
import { DetailItem } from "./OrderDetailItem";

interface OrderDetailsProps {
    orderValue: string,
    orderSize: string,
    ticker: string,
    marginRequired: string
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
    orderValue,
    orderSize,
    ticker,
    marginRequired,
}) => {
    return (
        <View style={styles.detailsContainer}>
            <DetailItem label="Order Value" value={`$${orderValue}`} />
            <DetailItem label="Order Size" value={`${orderSize} ${ticker}`} />
            <DetailItem label="Margin Required" value={`$${marginRequired}`} />
        </View>
    );
}