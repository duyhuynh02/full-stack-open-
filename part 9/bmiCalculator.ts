import { parseArguments } from './helper'

const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ** 2) 
    if (bmi < 18.5) {
        console.log('Underweight')
    } else if ((18.5 <= bmi) && (bmi <= 24.9)) {
        console.log('Normal (healthy weight)')
    } else if (bmi > 24.9) {
        console.log('Overweight')
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv); 
    calculateBmi(value1, value2)
} catch (error: unknown) {
    let errorMessage = 'Something is not right.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message; 
    }
    console.log(errorMessage)
}