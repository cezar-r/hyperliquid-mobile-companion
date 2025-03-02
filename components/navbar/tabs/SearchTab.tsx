import { Ionicons } from "@expo/vector-icons"

interface SearchTabIconProps {
    color: string,
}

export const SearchTabIcon: React.FC<SearchTabIconProps> = ({color}) => {
    return (
        <Ionicons
            name={'search'} 
            size={26} 
            color={color}
        />
    )
}