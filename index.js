

let benchmark_requests = 1;  //Cantidad de requests simultaneos a enviar.
let clients_in_db = 10000; //Se genera 
let clientes = false; //Consulta por clientes ? cambie a 'false' para consultar por ciudad


const request = require('request');

//#region - Testeo de consultas de clientes por ciudad

//Consulta a la base de datos
const BenchmarkDB = (test) => {
    let total_time = 0;
    let requests = 0;
    let s = 0;

    for(let r = 0; r < test; r++)
    request(clientes ? `http://207.246.69.202:2550/bd_cliente/${Math.floor(Math.random()*clients_in_db)}` : `http://207.246.69.202:2550/bd_ciudad/San%20Jose`, (err, res, body) => {
        if(err == null){
            total_time += Number.parseFloat(body);
            requests += 1;
        }
        s++;
        if(s == test){
            console.log(`En promedio la consulta duro ${total_time / requests }ms en la Base de datos para ${benchmark_requests} consultas simultaneas`)
            BenchmarkCache(benchmark_requests) //Consulta a el cache inicializada despues de que termine la consulta a la base de datos, reduz ruido en los resultados finales.
        }
    });
}

//Consulta a el cache
const BenchmarkCache = (test) => {
    let total_time = 0;
    let requests = 0;
    let s = 0;

    for(let r = 0; r < test; r++)
    request(clientes ? `http://207.246.69.202:2550/cache_cliente/${Math.floor(Math.random()*clients_in_db)}` : `http://207.246.69.202:2550/cache_ciudad/San%20Jose`, (err, res, body) => {  
        if(err == null){
            total_time += Number.parseFloat(body);
            requests += 1;
        }
        s++;
        if(s == test){ 
            console.log(`En promedio la consulta duro ${total_time / requests }ms en el cache para ${benchmark_requests} consultas simultaneas`)
        }
    });

}

//#endregion - Testeo de consultas de clientes por ciudad


BenchmarkDB(benchmark_requests)  //Iniciar benchmark con la base de datos
