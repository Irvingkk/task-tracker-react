import PropTypes from 'prop-types';

const Button = ({onClick, onShowAdd}) => {
    return (
        <div>
            <button onClick={onClick} style={{ background: onShowAdd ? 'orange': 'red'}} className='btn'>{onShowAdd ? 'Close': 'Add'}</button>
        </div>
    );
};

Button.defaultProps = {
    color: 'orange',
}
Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
