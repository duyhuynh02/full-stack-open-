interface MultiplyValues {
    value1: number;
    value2: number;
}

interface PeriodValue {
  value1: number;
  value2: number[];
}

export const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
}

export const parsePeriodArguments = (args: string[]): PeriodValue => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const target = Number(args[2]);
  const periodTraining = args.slice(2).map(Number);

  if (isNaN(target) || periodTraining.some(isNaN)) {
    throw new Error("All arguments must be numbers");
  }

  return {
    value1: target,
    value2: periodTraining
  }
}