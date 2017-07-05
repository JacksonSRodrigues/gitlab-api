const Calculator = require('../dist/index').Calculator;

describe('Calculator', () => {

    let subject;

    beforeEach(function() {
        subject = new Calculator();
    });

    describe('add', () => {
        it('should add two numbers together', () => {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
    describe('subtract', () => {
        it('should subtract a number from other', () => {
            var result = subject.subtract(3, 2);
            if (result !== 1) {
                throw new Error('Expected 3 - 2 = 1 but was ' + result);
            }
        });
    });
    describe('multiply', () => {
        it('should multiply two numbers together', () => {
            var result = subject.multiply(2, 3);
            if (result !== 6) {
                throw new Error('Expected 2 * 3 = 6 but was ' + result);
            }
        });
    });
    describe('divide', () => {
        it('should divide one number from other', () => {
            var result = subject.divide(3, 2);
            if (result !== 1.5) {
                throw new Error('Expected 3 / 2 = 1.5 but was ' + result);
            }
        });
    });
});