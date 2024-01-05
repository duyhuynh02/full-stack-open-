interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
interface CoursePartDescription extends CoursePartBase {
    description: string; 
}

interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
}
  
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

/**
 * Helper function for exhaustive type checking
*/

const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };

const Part = ({ courseParts }: CoursePart[]) => {
    return (
        <div>
            {courseParts.map((part, index) => {
                switch (part.kind) {
                    case "basic":
                        return (<div key={index}>
                                <b><p>{part.name} {part.exerciseCount}</p></b>
                                {part.description}
                            </div>);
                    case "group":
                        return (<div key={index}>
                            <b><p>{part.name} {part.exerciseCount}</p></b>
                            project exercise: {part.groupProjectCount}
                        </div>);
                    case "background":
                        return (<div key={index}>
                            <b><p>{part.name} {part.exerciseCount}</p></b>
                            <p>{part.description}</p>
                            {part.backgroundMaterial}
                        </div>);
                    case "special": 
                    return (<div key={index}>
                                <b><p>{part.name} {part.exerciseCount}</p></b>
                                <p>{part.description}</p>
                                <p>required skills: {part.requirements.map((skill, index) => <span key={index}>{skill} </span>)}</p>
                    </div>);
                    default: 
                        return assertNever(part);   
                }
            })}
        </div>
    )
}


export default Part; 