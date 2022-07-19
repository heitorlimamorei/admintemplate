import { createContext, useState, useEffect } from "react";
import Router from "../../../node_modules/next/router";
import firebase from "../../firebase/config";
import Usuario from "../../model/Usuario";
import Cookies from "../../../node_modules/js-cookie/index";
interface AuthContextProps {
  usuario?: Usuario;
  loginGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;
  carregando?: boolean;
  login?: (email:string, senha:string) => Promise<void>;
  cadastrar?: (email:string, senha:string) => Promise<void>;
  
}
const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(
  usuarioFirebase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL,
  };
}
function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set("admin-template-lwolf-auth", logado, {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-lwolf-auth");
  }
}

export function AuthProvider(props) {
  const [carregando, setCarregando] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>(null);
  async function configurarSecao(usuarioFirebase) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }
  async function cadastrar(email:string, senha:string) {
    try {
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)

      await configurarSecao(resp.user);
      Router.push("/");
    } finally {
      setCarregando(false);
    }
  }
  async function loginGoogle() {
    try {
      const resp = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider());
        await configurarSecao(resp.user);
      Router.push("/");
    } finally {
      setCarregando(false);
    }
  }
  async function login(email:string, senha:string) {
    try {
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)

      await configurarSecao(resp.user);
      Router.push("/");
    } finally {
      setCarregando(false);
    }
  }
  async function logout() {
    try {
      setCarregando(true);
      await firebase.auth().signOut();
      await configurarSecao(null);
      Router.push("/autenticacao");
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    if (Cookies.get("admin-template-lwolf-auth")) {
      const cancelar = firebase.auth().onIdTokenChanged(configurarSecao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        usuario,
        loginGoogle,
        login,
        logout,
        carregando,
        cadastrar
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
