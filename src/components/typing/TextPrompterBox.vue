<template>
    <div>
        <p class="all-text">
            <span class="correct-text">{{ correctText }}</span>
            <span class="incorrect-text">{{ incorrectText }}</span>
            <span class="current-text">{{ currentText }}</span>
            <span class="next-word">{{ nextWord }}</span>
            <span class="future-text">{{ futureText }}</span>
        </p>
    </div>
</template>

<script>

const incorrectTextAppendix = '  …';

export default {
    name: 'TextPrompterBox',
    props: {
        targetText: String,
        successCount: Number,
        errorCount: Number,
    },
    data() {
        return {
            correctText: '',
            incorrectText: '',
            currentText: '',
            nextWord: '',
            futureText: '',
        };
    },
    methods: {
        identifyTextGroups() {
            this.correctText = this.targetText.substr(0, this.successCount);
            this.incorrectText = this.targetText.substr(this.successCount, this.errorCount);

            const textToCome = this.targetText.substring(this.typedCharCount);
            const wordsToCome = textToCome.split(' ');
            const [firstFutureWord, secondFutureWord, ...distantFutureWords] = wordsToCome;
            [this.currentText, this.nextWord] = [firstFutureWord, secondFutureWord].map(x => (x !== undefined ? `${x} ` : ''));
            this.futureText = distantFutureWords.join(' ');

            const surplusCharCount = Math.max(0, (this.typedCharCount) - this.targetText.length);
            if (surplusCharCount > 0) {
                this.incorrectText += incorrectTextAppendix;
            }
        },
    },
    computed: {
        typedCharCount() {
            return this.successCount + this.errorCount;
        },
    },
    watch: {
        typedCharCount() {
            this.identifyTextGroups();
        },
        targetText() {
            this.identifyTextGroups();
        },
    },
};
</script>

<style scoped lang="stylus">
.all-text {
    font-size: 20px;
}

.correct-text {
    color: green;
    background-color: #d8ffd8;
}

.current-text {
    color: black;
}

.next-word {
    color: #3f3f3f;
}

.incorrect-text {
    color: darkred;
    background-color: lightcoral;
}

.future-text {
    color: grey;
}
</style>
