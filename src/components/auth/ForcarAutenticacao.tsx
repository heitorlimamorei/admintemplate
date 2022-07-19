import Image from "../../../node_modules/next/image"
import { useRouter } from "../../../node_modules/next/router"
import Loading from '../../../public/images/loading.gif'
import useAuth from "../../data/hook/useAuth"
export default function ForcarAutenticacao(props){
    const { usuario, carregando } = useAuth()
    const router = useRouter()
    function renderizarConteudo(){
        return (
            <>
            {props.children}
            </>
        )
    }
    function renderizarCarregando(){
        return (
            <div className={`
            flex  items-center justify-center h-screen
            `}>
                <Image src={Loading}/>
            </div>
        )
    }
    if(!carregando && usuario?.email){
        return renderizarConteudo()
    } else if(carregando){
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}