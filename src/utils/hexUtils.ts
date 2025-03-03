
/**
 * Generates a random hexadecimal string of the specified length
 * @param length The length of the hexadecimal string to generate
 * @returns Random hexadecimal string
 */
export const generateHexString = (length: number): string => {
  const characters = '0123456789ABCDEF';
  let result = '';
  
  // Generate 'length' random hexadecimal characters
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  
  return result;
};

/**
 * Copies text to clipboard
 * @param text The text to copy
 * @returns Promise that resolves when text is copied
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};
