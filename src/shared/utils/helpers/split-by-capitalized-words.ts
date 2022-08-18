export const splitByCapitalizedWords = (text: string, separator: string) => {
    const lowercasedText = text.toLowerCase();
    let resultText = "";

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const isLowercasedChar = char === lowercasedText[i];

        resultText += (isLowercasedChar)
            ? lowercasedText[i]
            : (resultText && separator) + char;
    }

    return resultText.split(separator);
};
