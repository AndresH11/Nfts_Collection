import { useAuth } from "../context/AuthContext";

const Header = ()=>{

    //IMPORTANDO FUNCION PARA CERRAR SESIÓN
    const { logOut } = useAuth();

    return(
        <header className="flex justify-between px-5 py-2.5 border items-center">
            <h1 className="text-black font-black text-2xl">NFT Generator</h1>
            <button type="button" onClick={logOut} className="w-28 h-10 text-white not-italic text-lg leading-5 font-medium mb-2 bg-blue-600 hover:bg-blue-700 rounded-3xl" >logOut</button>
        </header>
    );
}
export default Header;