export const isFormValid = (
    address: string,
    secretKey: string,
): boolean => {
    return address.length > 0 && secretKey.length > 0;
}