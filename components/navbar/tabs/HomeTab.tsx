import { MaterialCommunityIcons } from "@expo/vector-icons"

interface HomeTabIconProps {
    color: string,
}

export const HomeTabIcon: React.FC<HomeTabIconProps> = ({color}) => {
    return (
        <MaterialCommunityIcons
            name={'home'} 
            size={28}
            color={color}
        />
    )
}