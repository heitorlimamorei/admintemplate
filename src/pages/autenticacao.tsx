import { useState } from "react";
import AuthInput from "../components/auth/AuthInput";
import { MsgErrorIcon } from "../components/icons/Icones";
import useAuth from "../data/hook/useAuth";

export default function Autenticacao() {
  const { login, cadastrar, usuario, loginGoogle } = useAuth();
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [erro, setErro] = useState(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch(ev) {
      exibirErro(ev?.message ?? `Ocorreu um erro no ${modo}`, 10)
    }
  }
  function exibirErro(msg: string, tempo = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempo * 1000);
  }
  return (
    <div
      className={`flex  
    h-screen items-center 
    justify-center
    `}
    >
      <div className={`hidden md:block md:w-1/2 lg:w-2/3 `}>
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem de autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className={` w-full md:w-1/2 m-10 lg:w-1/3`}>
        <h1
          className={`
        text-xl font-bold mb-5
        `}
        >
          {modo === "login"
            ? "Entre com sua conta"
            : "Cadastre-se na plataforam"}
          {erro ? (
            <div
              className={` flex items-center bg-red-400 text-white py-3 px-5 my-2
              border border-red-700 rounded-lg
              `}
            >
              {MsgErrorIcon()}
              <span className={`ml-3`}>{erro}</span>
            </div>
          ) : (
            false
          )}
        </h1>
        <AuthInput
          tipo="email"
          label="Email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          tipo="password"
          label="Senha"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />
        <button
          onClick={submeter}
          className={`
            w-full bg-indigo-500 hover:bg-indigo-400 
            text-white rounded-lg px-4 py-3 mt-6
            `}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>
        <hr className={`my-6 border-gray-300 w-full`} />
        <button
          onClick={loginGoogle}
          className={`
            w-full bg-red-500 hover:bg-red-400 
            text-white rounded-lg px-4 py-3 
            `}
        >
          Entrar com o Google
        </button>
        {modo === "login" ? (
          <p>
            Novo por aqui?
            <a
              onClick={() => {
                setModo("cadastro");
              }}
              className={`
            text-blue-500 
            hover:text-blue-700 
            font-semibold 
            cursor-pointer
            `}
            >
              {" "}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p>
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className={`
          text-blue-500 
          hover:text-blue-700 
          font-semibold 
          cursor-pointer
          `}
            >
              {" "}
              Entre em sua conta
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
