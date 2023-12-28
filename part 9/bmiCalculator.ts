const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ** 2) 
    if (bmi < 18.5) {
        console.log('Underweight')
    } else if ((18.5 <= bmi) && (bmi <= 24.9)) {
        console.log('Normal (healthy weight)')
    } else {
        console.log('Overweight')
    }
}

calculateBmi(169, 43)

/* 
    < 18.5 : underweight 
    18.5 - 24.9: normal
    25 - 29.9: obese 
*/
