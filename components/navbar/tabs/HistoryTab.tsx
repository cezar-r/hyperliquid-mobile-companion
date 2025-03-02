import { MaterialCommunityIcons } from "@expo/vector-icons"

interface HistoryTabIconProps {
    color: string,
}

export const HistoryTabIcon: React.FC<HistoryTabIconProps> = ({color}) => {
    return (
        <MaterialCommunityIcons 
            name={'history'} 
            size={28}
            color={color}
        />
    )
}