import Part from "./Part";

interface ContentProps {
    name: string; 
    exerciseCount: number; 
}
    
const Content = ({ courseParts }: ContentProps[]) => {
    return (
        <div>
            <Part courseParts={courseParts} />
        </div>
    );
};
    
export default Content; 