import { parsePeriodArguments } from "./helper";

interface Result {
    periodLength: number;
    trainingDays: number; 
    success: boolean;
    rating: number;
    ratingDescription: string; 
    target: number;
    average: number; 
}

const calculateExercises = (dailyExerciseHoursArray: number[], target: number): Result => {

    const periodLength = dailyExerciseHoursArray.length 
    const trainingDays = dailyExerciseHoursArray.filter(day => day > 0).length
    const average = dailyExerciseHoursArray.reduce((a, b) => a + b, 0) / 7 
    const success = average >= target

    const rating = Math.round(average)
    const ratingDescription = `You did ${
        rating === 1 ? 'not so good' :
        rating === 2 ? 'not too bad but could be better' : 
        'best'
    }`

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }


}

try {
    const { value2, value1 } = parsePeriodArguments(process.argv);
    calculateExercises(value2, value1);
} catch (error: unknown) {
    let errorMessage = 'Something is not right.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message; 
    }
    console.log(errorMessage)
}