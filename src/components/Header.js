import ProcTypes from 'prop-types'
import Button from "./Button";
import { useLocation} from 'react-router-dom'

const Header = ({title, onToggle, onShowAdd}) => {
    const location = useLocation().pathname;
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location === '/' && <Button onClick={onToggle} onShowAdd={onShowAdd}/>}
        </header>
    );
};
//
// Header.defaultProps = {
//     title: 'Task Tracker'
// }
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black',
// }

Header.prototype = {
    title: ProcTypes.string.isRequired,
}
export default Header;

