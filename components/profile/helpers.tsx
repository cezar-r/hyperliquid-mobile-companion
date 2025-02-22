import { NUM_CHARS_REVEALED_ADDRESS } from "./constants";

export function trimAddress(
    address: string
): string {
    return address.slice(0,NUM_CHARS_REVEALED_ADDRESS+2)  // +2 to inclue the "0x"
        + "..." 
        + address.slice(
            address.length-NUM_CHARS_REVEALED_ADDRESS, 
            address.length
        );
}