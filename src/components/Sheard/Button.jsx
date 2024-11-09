/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

export default function Button({ type, text, color, border, hover, textColor, ...rest }) {
    return (
        <button type={type} className={`  inline-block py-2.5 px-3 sm:px-5 rounded-lg  sm:text-sm text-xs  ${color} ${textColor ? textColor : 'text-white '}  border ${border}  ${hover} transition-all duration-150 ease-in-out`}  {...rest}>
            {text}
        </button>
    )
}
