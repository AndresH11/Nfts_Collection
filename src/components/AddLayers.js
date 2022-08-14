import { useState } from 'react';
import { useView } from '../context/ViewContext';
import { nanoid } from 'nanoid';
import { Alert } from './Alert';
import CreateCollection  from "./CreateCollection";

const AddLayer = ()=>{
  //ESTADO DE RAREZA DEL NFT
  const [rarity, setRarity] = useState(0);
  //ESTADO DE LA PREVIEW
  const [prepreview, setPrepreview] = useState('');
  //ESTADO DE ERRORES
  const [error, setError] = useState('');

  //SE IMPORTAN FUNCIONES DE ViewContext.js
  const { viewLayer, setViewLayer, layers, setLayers, nombre,setNombre, setNfts, reload, setReload } = useView();

  //HANDLECHANGE layer (AGREGANDO CAPAS)
  const handleLayer = (e)=>{
    //OBTENEMOS LAS IMAGENES DE LA CAPA
    const file = e.target.files;
    
    //VALIDANDO QUE HAYA INFORMACION EN file
    if(file.length > 0){
      const aux = layers;
      aux.push({elements : [file],weight : rarity, name : nombre});

      setLayers(aux);

      //CONSEGUIMOS LAS URLs Y LAS MANDAMOS A LA FUNCION setPrepreview
      const urlName = [];
      const indice = layers.length - 1;
      for(let items = 0; items < layers[indice].elements[0].length; items++){
        //CONSEGUIMOS EL NOMBRE DE LA PHOTO
        let namePhoto = (layers[indice].elements[0])[items].name;
        //CONSEGUIMOS LA URL DE LA FOTO
        let urlPhoto = URL.createObjectURL((layers[indice].elements[0])[items]);
        //SE LO PASAMOS A LA VARIABLE urlName
        urlName.push({url : urlPhoto, name : namePhoto});
      }

      //ACTUALIZAMOS LA PREVIEW
      setPrepreview(urlName);
    }
  }

  //HANDLECHANGE NOMBRE (OBTENEMOS EL NOMBRE)
  const handleNombre = (e)=>{
    setNombre(e.target.value)
  }

  //HANDLECHANGE RARITY (OBTENEMOS LA RAREZA) 
  const handleRarity = (e)=>{
    e.preventDefault();
    setRarity(e.target.value);
  }

  //HANDLECHANGE BACK (DEVOLVER AL HOME)
  const handleBack = ()=>{

    //QUITANDO EL ULTIMO ELEMENTO DEL ARRAY LAYES, DE ESA MANERA NO SE MOSTRARÁ EN EL LISTADO DEL HOME
    layers.pop();

    //QUITANDO LA VISUALIZACION DE ADDLAYERS
    setViewLayer(false);

    //DEVOLVEMOS prepreview A SU ESTADO INICIAL
    setPrepreview('');

    //DEVOLVEMOS rarity A SU ESTADO INICIAL
    setRarity(0);

    //DEVOLVEMOS nombre A SU ESTADO INICIAL
    setNombre('');
  }

  //GENERAMOS LOS NFTs
  const handleColeccion = async(layers)=>{

    try {

      //VALIDAMOS QUE HAYA INFORMACION DEN layers
      if(layers.length === 0){
        //ACTUALIZAMOS EL ESTADO DEL ERROR
        setError('Debes elegir un archivo');
        //LIMPIAMOS EL ERROR EN 5 segundos
        return setTimeout(() => {
          setError('');
        }, 5000);
      }

      //ACTIVAMOS LA VISTA DE CARGA
      setReload(true);
      //CONSEGUIMOS LA COLECCION DE NFTs
      const arrayCollection = await CreateCollection({layers : layers, collectionSize : 8, canvasWidth : 200, canvasHeight : 200, percentage : 0.067});

      //ARRAY AUXILIAR
      const arrayImages = [];

      arrayCollection.forEach((image)=>{
        arrayImages.push(image);
      });

      //OCULTAMOS LA PESTAÑA PARA VOVER AL HOME
      setViewLayer(false);

      //OCULTAMOS EL ESTADO DE CARGA
      setReload(false);

      //ACTUALIZAMOS EL ESTADO DE image
      setNfts(arrayImages);

      //LIMPIAMOS LA PREVIEW DE LAS IMAGENES QUE SE VAN A GUARDAR
      setPrepreview('');

      //LIMPIAMOS EL VALOR DE INPUT nombre
      setNombre('');

      //LIMPIAMOS EL VALOR DE INPUT rarity
      setRarity(0);

    } catch (error) {
      console.warn(error.message);
    }
  }

  //FUNCION PARA ELIMINAR DE LA PREPREVIEW
  const preprepreviewDelete = (e)=>{
    
    //NOTA1: ESTA SECCION DEL CODIGO SOLO ELIMINA EL ELEMENTO DE LA SECCION Add Layer

    //CONSIGUIENDO NOMBRE DEL CONTENEDOR SELECCIONADO (nombre de la foto)
    const nameCotainer = e.target.parentElement.childNodes[0].childNodes[1].outerText;

    //FILTRANDO ARRAY, SE OPTIENEN TODOS LOS ELEMENTO A EXEPCIÓN DEL ELEMENTO QUE QUEREMOS ELIMINAR
    const newPreview = prepreview.filter((items)=>items.name !== nameCotainer);
    
    setPrepreview(newPreview);
    //FIN DE NOTA1

    //NOTA2: ESTA SEECION DEL CODIGO ELIMINA EL ELEMENTO DE LA PREVIEW GENERAL ( HOME ) DE NFT
    const newPreview2 = [];
    const indice = layers.length - 1;
    for(let index = 0 ; index < layers[indice].elements[0].length ; index++){
  
      if((layers[indice].elements[0])[index].name !== nameCotainer){
        newPreview2.push((layers[indice].elements[0])[index]);
      }
    }

    layers[indice].elements[0] = newPreview2;
    //FIN DE NOTA2
  }

  return(
      <div className={`${viewLayer && !reload ? 'block' : 'hidden'}  w-full h-full bg-white absolute inset-0 text-black`}>
          <form className='bg-white pb-4'>
            {error && <Alert message={error} />}
            <div className='mt-5 pl-5'>
              <i className='bx bx-chevron-left text-6xl text-neutral-500 cursor-pointer hover:text-neutral-600' onClick={handleBack} ></i>
            </div>

            <div className=' w-4/5 lg:w-7/12 mx-auto flex items-center justify-center flex-col '>
                <h1 className='text-4xl not-italic font-normal' >Add Layer</h1>

                {/*ESTA SECCION NO SE MOSTRARÁ HASTA QUE HAYAN ESCRITO UN NOMBRE Y UNA RAREZA PARA LA CAPA (INPUT FILE) (INPUT RANGE*/}
                {nombre && rarity > 0 ? <div className='mt-5 border-8 border-neutral-600 w-full h-56'>
                    <label htmlFor='layer'className=' flex flex-col items-center justify-center h-full text-center mx-auto border-4 border-white border-dashed text-2xl cursor-pointer bg-neutral-500' ><p className=' w-9/12 lg:w-4/12 h-12 bg-white text-black text-center rounded pt-2 font-medium text-neutral-500'><i className='bx bxs-file-plus'></i>Add Layer</p><p className='text-lg mt-5 text-white'>Or drop files here</p></label>
                    <input type='file' name='layer' id='layer' required multiple className="hidden" onChange={handleLayer} />
                </div>: ''}

                <div className='w-full mt-5'>
                  <p>Name</p>
                  <input type='text' name='nombre' id='name' value={nombre} onChange={handleNombre} required className='mb-2.5 pl-2.5 border w-full h-9 rounded focus:outline-none focus:shadow-outline' />

                  {/*PREVIEW DE LAS IMAGENES QUE SE VA AGUARDAR, TIENE LA OPCION DE ELIMINARLA*/}
                  {(prepreview || []).map((urlName)=>{

                      return(
                        <div key={nanoid(20)} className='w-full h-20 my-1.5 px-5 border rounded flex items-center justify-between'>
                          <div className='flex w-72'>
                            <img className=' w-16 h16 rounded' src={urlName.url} alt='preview' />
                            <p className='ml-5 pl-2.5 pt-3.5 rounded inline border w-full h-14'>{urlName.name}</p>
                          </div>
                          <i className='bx bxs-trash-alt text-red-600 text-2xl cursor-pointer' onClick={preprepreviewDelete}></i>
                        </div>
                      );
                        
                    }
                  )}

                  <p className='inline'>Choose the rarity:</p>
                  <p className='text-blue-500 inline pl-2'>0% rarity, 100% common</p>
                  <div className='w-full flex items-center'>
                    <input type='range' min='0' max='100' step='1' value={rarity} name='rarity' id='rarity' className='w-11/12' onChange={handleRarity} />
                    <p className='inline border ml-2.5 px-3 py-1 bg-neutral-300'>{`${rarity}%`}</p>
                  </div>
                </div>
                <button type='button' onClick={()=>handleColeccion(layers)} className='mt-5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl w-full rounded-3xl h-14' >Save</button>
            </div>
          </form>
      </div>
  );
}

export default AddLayer;