import { createContext, useContext, useState } from "react";

const viewContext = createContext();

export const ViewProvider = ({ children })=>{

  const [viewLayer, setViewLayer] = useState(false);
  
  //SE UTILIZARÁ PARA OBTENER LAS CAPAS DE LOS NFTs
  const [layers,setLayers] = useState([]);
  //ESTADO DEL NOMBRE DE LA CAPA
  const [nombre,setNombre] = useState('');
  //SE UTILIZARÁ PARA OBTENER LA COLECCION DE NFts Y MOSTRARLA EN LA PREVIEW 
  const [nfts,setNfts] = useState();
  //SE UTILIZARÁ PARA MOSTRAR EL ESTADO DE CARGA
  const [reload,setReload]=useState(false);

  return(
    <viewContext.Provider value={{ viewLayer, setViewLayer, layers, setLayers, nombre, setNombre, nfts, setNfts, reload, setReload }} >
        { children }
    </viewContext.Provider>
  );
}

//HOOK
//ESTE HOOK VA A CONTENER TODA LA INFORMACION DEL USUARIO
export const useView = ()=>{
    const context = useContext(viewContext);
    if(!context) throw new Error('there is not auth provider');
    return context;
};