import * as Haptics from 'expo-haptics';

export const lightHaptic = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

export const mediumHaptic = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

export const defaultHaptic = async () => {
    await Haptics.impactAsync();
}

export const selectionHaptic = async () => {
    await Haptics.selectionAsync();
}

export const successHaptic = async() => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}