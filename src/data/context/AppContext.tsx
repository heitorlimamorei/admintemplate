import { createContext, useState, useEffect} from "react";
//type Tema = "dark" | ""
interface AppContextProps {
    tema: string;
    alternarTema: () => void;
}
type AppContextProvider = {
    children:any
}

const AppContext = createContext<AppContextProps>({
    tema:"",
    alternarTema:null
})


export function AppContextProvider(props:AppContextProvider){
    const [tema, setTema] = useState('')
    function alternarTema(){
        const novoTema = tema === 'dark' ? '' : 'dark'
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }
    useEffect(() =>{
        const tema = localStorage.getItem('tema')
        setTema(tema)
    }, [])
    return (
        <AppContext.Provider value={{
            tema:tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContext