/* eslint-disable react/prop-types */
export default function JobHeading({ text, icon }) {
    return (
        <h1 className=" flex items-center gap-2 font-medium mb-5 text-primary">{icon}{text} </h1>
    )
}
