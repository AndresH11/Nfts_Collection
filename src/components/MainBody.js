import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useView } from '../context/ViewContext';
import { Alert } from './Alert';
import CreateCollection  from "./CreateCollection";
import randomColorRGB from 'random-color-rgb';

const MainBody = ()=>{

  //ESTADO INICAL DE LA LONGITUD DE LA COLLECCION
  const [collection, setCollection] = useState({
    size : 0,
    nameCollection : '',
  });

  const [error,setError] = useState('');

  const { viewLayer, setViewLayer, layers, setLayers, nfts, setNfts, reload, setReload } = useView();

  //FUNCION PARA ELIMINAR CAPA
  const handleDeleteLayer = async(e)=>{
    //CONSEGUIMOS EL NOMBRE DE LA CAPA A ELIMINAR
    const layerName = (e.target.parentElement.childNodes[0].outerText.split(':')[1]).trim();
    //ELIMINAMOS LA CAPA
    var newLayers = layers.filter((layer)=>layer.name !== layerName);
    //ACUTALIZAMOS EL LISTADO DE LAS CAPAS
    setLayers(newLayers);
    
    //ACUTALIZAMOS LA PREVIEW DEL NFT
    if(newLayers.length > 0){
      const newPreview = await CreateCollection({layers : newLayers, collectionSize : 8, canvasWidth : 200, canvasHeight : 200, percentage : 0.067});
      setNfts(newPreview);
    }else{
      //LE DAMOS EL VALOR INICIAL EN CASO NO HAYA CAPAS QUE MOSTRAR
      setNfts('');
    }
  }

  //LEYENDO EL VALOR INGRESADO POR EL USUARIO (size of the collection)
  const handleCollection = ({ target : { name,value } })=>{
    setCollection({...collection, [name] : value});
  }

  //FUNCION PARA DESCARGAR LOS NFTs
  const handleDowloadCollection = async(e)=>{
    e.preventDefault();

    if(collection.size > 0 && collection.size <11 && collection.nameCollection !== ''){
      //ACTIVANDO LA VISTA DE LA CARGA
      setReload(true);
      //GENERANDO LOS NFTs
      const collectionGenerate = await CreateCollection({layers : layers, collectionSize : collection.size, canvasWidth : 200, canvasHeight : 200, percentage : 0.067});

      //CREANDO ETIQUETA ANCLA
      const etiquetaAncla = document.createElement('a');
      
      //DESACTIVANDO LA VISTA DE LA CARGA
      setReload(false);

      //DESCARGANDO LOS NFTs
      collectionGenerate.forEach(url => {
        etiquetaAncla.href = url;
        etiquetaAncla.download=`${nanoid(30)}`;
        etiquetaAncla.click();
      });
    }

    //ARROJANDO UN ERROR
    setError('coloca un nombre y numero de imagenes max 10');

    //LIMPIAMOS EL ERROR
    setTimeout(() => {
      setError('')
    }, 5000);
  }

  return(
    <main className={`${ !viewLayer && !reload ? 'block' : 'hidden' } w-full h-full grid grid-cols-1 lg:grid-cols-2 text-black px-5 py-5`}>
      {/*ADD LAYERS*/}
      <div>
        <h1 className="text-2xl font-black mb-2.5">Add Layers</h1>
        <div className={`${layers.length  > 2 ? 'overflow-y-scroll' : ''} lg:w-11/12`} style={{'height':'400px'}}>
          {(layers || []).map((layer)=>{
            //Obteniendo numero de la capa
            const number = layers.indexOf(layer) + 1;
            return(
                <div key={nanoid(10)} className="lg:w-10/12 h-24 px-4 text-xl font-medium mb-3 border border-indigo-600 flex justify-between items-center" >
                  <h2 className='font-semibold'>{`Layer ${number}: ${layer.name}`}</h2>
                  <i className='bx bxs-trash-alt text-red-600 cursor-pointer'onClick={handleDeleteLayer} ></i>
                </div>
            )
          })}
          <div className="lg:w-10/12 h-24 border border-dashed border-indigo-600 flex justify-center items-center flex-col cursor-pointer" onClick={()=>setViewLayer(true)} >
            <i className='bx bx-plus text-indigo-600 font-black text-2xl'></i>
            <h2 className="font-black text-2xl text-indigo-600 mt-2">Add layer</h2>
          </div>
        </div>
      </div>

      {/*PREVIEW*/}
      <div className='mt-5'>
        <h1 className="text-2xl font-black mb-2.5 inline">Preview</h1>
        <p className='inline ml-2.5 not-italic font-normal text-indigo-600'>(first eights nfts)</p>
        {/*SLIDER*/}
        <div className="sliderContainer">
          <ul>
            {(nfts || ['1','2','3','4','5','6','7','8']).map((nft)=>{

              return nfts ? <li key={nanoid(10)} ><img src={nft} alt='.' /></li> : <li key={nanoid(10)} ><div className='w-full h-full flex justify-center items-center text-white font-medium text-center text-5xl' style={{ 'backgroundColor' : `${randomColorRGB({opacity: 0.3})}`, 'borderRadius':'15px' }}>Preview Image</div></li>

            })}
          </ul>
        </div>
        {/*DOWNLOAD*/}
        <div>
          <div className='flex flex-wrap items-center justify-center lg:justify-start pl-2.5'>
            <div>
              <p className='font-semibold'>Size</p>
              <input type='number' name='size' id='size' value={collection.size} onChange={handleCollection} className='h-7 pl-2.5 w-48 focus:outline-none focus:shadow-outline border rounded' />
            </div>
            <div className='md:ml-7'>
              <p className='font-semibold'>Name</p>
              <input type='text' name='nameCollection' id='nameCollection' placeholder='Name of your colletion' onChange={handleCollection} className='h-7 pl-2 w-48 focus:outline-none focus:shadow-outline border rounded' />
            </div>
          </div>
          <div className='mt-2.5'>{error && <Alert message={error} />}</div>
          <button type='button' onClick={handleDowloadCollection} className='w-full h-14 mt-10 text-white not-italic text-lg leading-5 font-black mb-2 bg-blue-600 hover:bg-blue-700 rounded-3xl' >Download Collection</button>
        </div>
      </div>
    </main>
  );
}

export default MainBody;