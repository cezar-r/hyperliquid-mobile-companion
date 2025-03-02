import { MaterialCommunityIcons } from "@expo/vector-icons"

interface ProfileTabIconProps {
    color: string,
}

export const ProfileTabIcon: React.FC<ProfileTabIconProps> = ({color}) => {
    return (
        <MaterialCommunityIcons 
            name={'account'} 
            size={28}
            color={color}
        />
    )
}