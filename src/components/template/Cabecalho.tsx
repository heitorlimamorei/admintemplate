import Titulo from './Titulo'
import BotaoTema from './BotaoTema'
import useAppData from '../../data/hook/useAppData';
import Avatar from './AvatarUsuario';
interface CabecalhoProps {
    titulo: string;
    subtitulo: string;
    children?: any;
}
export default function Cabecalho(props:CabecalhoProps){
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <BotaoTema tema={tema} alternarTema={alternarTema}/>
                <Avatar />
            </div>
        </div>
    )
}