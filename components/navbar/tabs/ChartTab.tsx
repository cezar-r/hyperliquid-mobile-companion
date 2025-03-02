import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons"

interface ChartTabIconProps {
    color: string,
}

export const ChartTabIcon: React.FC<ChartTabIconProps> = ({color}) => {
    return (
        <FontAwesome6
            name={'chart-line'} 
            size={24}
            color={color}
        />
    )
}