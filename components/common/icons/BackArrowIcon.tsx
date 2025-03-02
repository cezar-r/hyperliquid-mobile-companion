import { Ionicons } from '@expo/vector-icons';

import { BackArrowStyle } from '../../../styles/constants';
import { TouchableOpacity } from 'react-native';

interface BackArrowProps {
    onPress: () => void,
}

export const BackArrow: React.FC<BackArrowProps> = ({
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons color={BackArrowStyle.color} name="chevron-back" size={BackArrowStyle.size} />
        </TouchableOpacity>
    );
}