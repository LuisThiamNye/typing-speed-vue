export default {
    firstDifferingIndex(first, second, charIndex = 0) {
        if (first.length > charIndex
            && second.length > charIndex
            && first[charIndex] === second[charIndex]) {
            return this.firstDifferingIndex(first, second, charIndex + 1);
        } else {
            return charIndex;
        }
    },
    commonString(first, second) {
        let matchingText = '';

        if (first.startsWith(second) || second.startsWith(first)) {
            matchingText = first.substr(0, second.length);
        } else {
            const diffIndex = this.firstDifferingIndex(first, second);
            matchingText = first.substring(0, diffIndex);
        }

        return matchingText;
    },
};
