const wordBankFilePath = 'statics/words.txt';
import axios from 'axios';

export default {
    loadWords() {
        return axios.get(wordBankFilePath);
    },
    generateSampleOfWords(source, quantity, currentQuantity = 0) {
        const nextWordIndex = Math.floor(Math.random() * source.length);
        const word = source[nextWordIndex];

        ++currentQuantity;
        if (currentQuantity < quantity) {
            return `${word} ${this.generateSampleOfWords(source, quantity, currentQuantity)}`;
        } else {
            return word;
        }
    },
    WPM(chars, seconds) {
        const words = chars / 5;
        const minutes = seconds / 60;
        return Math.round(words / minutes);
    },
    startTimer(seconds, finalCallback, secondPassesCallback) {
        let secondsRemaining = seconds;
        let countdownInterval;

        const secondPasses = () => {
            secondPassesCallback(secondsRemaining);
            if (secondsRemaining > 0) {
                secondsRemaining -= 1;
            } else {
                clearInterval(countdownInterval);
                finalCallback();
            }
        };

        secondPasses();
        countdownInterval = setInterval(secondPasses, 1000);
    },
};
