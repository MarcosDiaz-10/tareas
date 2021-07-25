require( 'colors' );

const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        marcarTareasCompletadas
} = require( './helpers/inquirer' )
const { guardarDB,
        leerDB
 } = require('./helpers/guardarArchivo');

const Tareas = require('./models/Tareas');


const main = async() => {
    let opt = '';
    //Crea una nueva instancia de la clase de tareas
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB )
    }

    do{
        //Imprime el menu
        opt = await inquirerMenu();

        switch( opt ){
            case '1' : 
            //En en inquirer de leer input, esto trae la respuesta de el usuario y aqui al llamar el leerInput le damas el mensaje que quiero mostrar
                const desc = await leerInput( 'Descripcion:' );
                //aqui crea una tarea llamando al metodo de la clase Tareas
                tareas.crearTarea( desc )
            break;

            case '2':
                tareas.listarTareas();
            break;

            case '3':
                tareas.listarPendientesCompletadas( true )
            break;

            case '4':
                tareas.listarPendientesCompletadas( false )
            break;

            case '5':
               const ids = await marcarTareasCompletadas( tareas._listadoArr )
               tareas.toggleCompletadas( ids );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas._listadoArr );
                if( id !== '0'){
                    
                    const ok = await confirmar( 'Estas seguro de querer borrar la tarea?' )
                    if( ok ){
                        tareas.borrarTareas( id )
                        console.log('\nTAREA ELIMINADA EXITOSAMENTE'.green)
                    }
                }
            break;
        }

        guardarDB( tareas._listadoArr )

        console.log('\n')
        //Esto hace una pausa hasta que el usuario toque una letra 
        if( opt !== '0') await pausa();

    }while( opt !== '0');

};

main();



