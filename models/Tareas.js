const colors = require( 'colors' )
const Tarea = require( './tarea' )
const fs = require( 'fs' )



//Aqui crea la clase de tareas que toma la otra clase de tarea, se crea un metodo para crear las tareas donde se llama a la clase de tarea y luego las lista 
class Tareas {
    
    _listado = {};
    
    get _listadoArr() {
        
        const listado = []

        Object.keys( this._listado ).forEach( key => {
            const tarea = this._listado[ key ];
            listado.push( tarea )
        } ) 
            
        return listado
    }

    constructor(){
        this._listado = {};
    }

    borrarTareas( id = ''){
        if( this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[ tarea.id ] = tarea;
        })
    }


    crearTarea( desc = '' ){

        const tarea = new Tarea( desc );

        this._listado[ tarea.id ] = tarea ;

    }

    listarTareas(){

        this._listadoArr.forEach( ( tarea, i ) => {

            const indiceParaListar = i + 1;

            if( tarea.completadoEn !== null ){

                console.log(`${ colors.green( indiceParaListar ).green }. ${ tarea.desc } :: ${ 'Completada'.green }`)

            }else{

            console.log(`${ colors.red(indiceParaListar).red }. ${ tarea.desc } :: ${'Pendiente'.red}`)
                
            }

        })
    }

    listarPendientesCompletadas ( completadas = true ){

        const arrCompletadas = [];

        const arrPendientes = [];

        this._listadoArr.forEach( ( tarea ) => {

            const { completadoEn } = tarea;
            const estado = ( completadoEn )
                                    ?  true
                                    :  false
            if( estado === true){
                arrCompletadas.push( tarea)
            }else{
                arrPendientes.push( tarea )
            } 
        })
        if( completadas === true ){

            arrCompletadas.forEach( ( tareas, i ) => {
                const { desc, completadoEn } = tareas;
                const idx = `${ i + 1}`;

                console.log( `${ idx.green}${'.'.green} ${ desc } :: ${ completadoEn.toString().green }` )
            })
        }else{
            arrPendientes.forEach( ( tareas, i ) => {  
                const { desc } = tareas;
                const idx = `${ i + 1}`;    
                console.log( `${ idx.red }${'.'.red} ${ desc } :: ${ 'Pendiente'.red }`)
            })
        }
    }

    toggleCompletadas( ids = []){

            ids.forEach( id => {
                 
               const tarea = this._listado[id];

                if( !tarea.completadoEn ){
                    tarea.completadoEn = new Date().toISOString()
                }

            })

            this._listadoArr.forEach( tarea => {
                if( !ids.includes( tarea.id )){
                    this._listado[tarea.id].completadoEn = null;
                }
            })
    }

}



module.exports = Tareas;