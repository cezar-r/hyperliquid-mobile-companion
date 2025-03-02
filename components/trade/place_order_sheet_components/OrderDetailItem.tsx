import { View, Text } from "react-native";

import styles from "../../../styles/place_order_sheet";


interface DetailItemProps {
    label: string;
    value: string;
}

export const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <View style={styles.detailItem}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);