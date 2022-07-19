import Link from "../../../node_modules/next/link"
import useAuth from "../../data/hook/useAuth"
import { userAvatarDefault } from '../icons/Icones'
interface AvatarUsuarioProps {
    className?: string
}
export default function Avatar(props:AvatarUsuarioProps){
    const { usuario } = useAuth()
    return (
            <Link href='/perfil'>
                {usuario?.imagemUrl ? (
                     <img 
                     src={usuario?.imagemUrl} 
                     alt="avatar"
                     className={`
                             h-10 w-10 rounded-full cursor-pointer ml-3
                             ${props.className}
                         `}
                     />
                ) : (
                    <span
                    className="cursor-pointer h-10 w-10 "
                    >{userAvatarDefault(9)}</span>
                )}
            </Link>
    )
}