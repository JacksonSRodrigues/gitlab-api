
export class Calculator {

    add(...numbers: number[]): number {
        return numbers.reduce((final, value) => final + value);
    }

    subtract(...numbers: number[]): number {
        return numbers.reduce((final, value) => final - value);
    }

    multiply(...numbers: number[]): number {
        return numbers.reduce((final, value) => final * value);
    }

    divide(...numbers: number[]): number {
        return numbers.reduce((final, value) => final / value);
    }

}