interface AuthInputProps {
  valor: string;
  label: any;
  tipo?: 'text' | 'password'| 'email';
  valorMudou: (novoValor: any) => void;
  obrigatorio?:boolean;
}
export default function AuthInput(props: AuthInputProps) {
  return (
    <div className={`flex flex-col mt-2`}>
      <label>{props.label}</label>
      <input
        type={props.tipo ?? 'text'}
        value={props.valor}
        onChange={(ev) => props.valorMudou?.(ev.target.value)}
        required={props.obrigatorio}
        className={`
        px-4 py-3 rounded-lg bg-gray-200 mt-2
        border focus:border-blue-500 focus:outline-none focus:bg-white
        `}
      />
    </div>
  );
}
