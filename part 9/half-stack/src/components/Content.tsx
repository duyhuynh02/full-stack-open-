interface ContentProps {
    name: string; 
    exerciseCount: number; 
}
    
const Content = ({ courseParts }: ContentProps[]) => {
    return (
        <div>
            {courseParts.map(course => <div key={courseParts.indexOf(course)}>
                <p>{course.name} {course.exerciseCount}</p>
                </div>
            )}
        </div>
    );
};
    
export default Content; 