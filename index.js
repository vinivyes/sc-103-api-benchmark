

let benchmark_requests = 1;

const request = require('request');

const BenchmarkDB = (test) => {
    let total_time = 0;
    let requests = 0;
    let s = 0;

    for(let r = 0; r < test; r++)
    request(`http://207.246.69.202:2550/bd_ciudad/San%20Jose`, (err, res, body) => {
        if(err == null){
            total_time += Number.parseFloat(body);
            requests += 1;
        }
        s++;
        if(s == test){
            console.log(`Average of ${total_time / requests }ms on BD query for ${benchmark_requests} simultaneous queries;`)
            BenchmarkCache(benchmark_requests)
        }
    });
}
const BenchmarkCache = (test) => {
    let total_time = 0;
    let requests = 0;
    let s = 0;

    for(let r = 0; r < test; r++)
    request(`http://207.246.69.202:2550/cache_ciudad/San%20Jose`, (err, res, body) => {  
        if(err == null){
            total_time += Number.parseFloat(body);
            requests += 1;
        }
        s++;
        if(s == test){ 
            console.log(`Average of ${total_time / requests}ms on cache query for ${benchmark_requests} simultaneous queries;`)
        }
    });

}
BenchmarkDB(benchmark_requests)