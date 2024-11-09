/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

export default function RoundeBtn({ type, text, color, border, hover, textColor, ...rest }) {
	return (
		<button type={type} className={` text-xs  py-1.5 px-4 rounded-full   ${color} ${textColor ? textColor : 'text-white '}  border ${border ? border : "border-sky-500"}  ${hover} transition-all duration-150 ease-in-out`}  {...rest}>
			{text}
		</button>
	)
}

