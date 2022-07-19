interface ConteudoProps {
    children?: any;
}

export default function Template(props:ConteudoProps){
    return (
        <div className={`
        flex flex-col mt7
        `}>
            {props.children}
        </div>
    )
}