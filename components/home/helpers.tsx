export const getFontSize = (str: string) => {
    const length = str.length;
    const maxSize = 68;
    const minSize = 46;
    const maxLength = 15;
    const minLength = 5;
    
    if (length <= minLength) return maxSize;
    if (length >= maxLength) return minSize;
    
    const size = maxSize - ((length - minLength) * (maxSize - minSize) / (maxLength - minLength));
    return Math.round(size);
};