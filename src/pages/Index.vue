<template>
    <q-page class="flex flex-center">
        <div class="col typing-box">
            <div class="row">
                <div class="col">
                    <p>{{ secondsRemaining }}</p>
                </div>
                <div class="col-md-auto" />
                <div class="col">
                    <p>{{ CurrentWPM }} WPM</p>
                </div>
            </div>
            <text-prompter-box
                :target-text="targetText"
                :success-count="correctCharCount"
                :error-count="errorCount"
            />
            <div class="row">
                <div class="col">
                    <text-input
                        :test-state.sync="testState"
                        @input="val => userTextInput = val"
                    />
                </div>
                <div class="col">
                    <button @click="testState = 'ready'">
                        Restart
                    </button>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import TextPrompterBox from 'components/typing/TextPrompterBox';
import TextInput from 'components/typing/TextInput';
import TimedTypingTest from 'modules/timed-typing-test';
import StringTools from 'modules/string-tools';

const R = require('ramda');

const allowedSeconds = 60;
const wordsPerBatch = 10;
const maxBufferedChars = 50;

export default {
    name: 'PageIndex',
    components: {
        TextPrompterBox,
        TextInput,
    },
    data() {
        return {
            secondsRemaining: 0,
            CurrentWPM: 0,
            userTextInput: '',
            countdownInterval: null,
            allLoadedWords: [],
            targetText: '',
            testState: 'ready',
        }; // TODO observable
    },
    methods: {
        secondPasses(secondsRemaining) {
            this.secondsRemaining = secondsRemaining;
            this.CurrentWPM = TimedTypingTest.WPM(this.correctCharCount, this.secondsPassed);
        },
        startTest() {
            TimedTypingTest.startTimer(60, this.stopTest, this.secondPasses);
        },
        stopTest() {
            this.testState = 'end';
        },
        refillWords() {
            this.targetText
                += (this.targetText.trim() === '' ? '' : ' ')
                + TimedTypingTest.generateSampleOfWords(this.allLoadedWords, wordsPerBatch);
        },
    },
    computed: {
        secondsPassed() {
            return allowedSeconds - this.secondsRemaining;
        },
        isTiming() {
            return this.isCounting;
        },
        correctCharCount() {
            if (this.targetText === '') {
                return 0;
            } else {
                return StringTools.commonString(this.targetText, this.userTextInput).length;
            }
        },
        errorCount() {
            return this.userTextInput.length - this.correctCharCount;
        },
    },
    watch: {
        userTextInput() {
            if (this.targetText.length - this.correctCharCount < maxBufferedChars) {
                this.refillWords();
            }
        },
        testState(current) {
            if (current === 'active') {
                this.startTest();
            }
        },
    },
    mounted() {
        TimedTypingTest.loadWords()
            .then((response) => {
                this.allLoadedWords = response.data.split(/\r?\n/);
                this.refillWords();
            });
    },
};
</script>

<style scoped lang="stylus">
.typing-box {
    max-width: 600px;
}
</style>
