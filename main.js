import {add, runWeb} from './api/web.js'
import net

const n = add(1, 2)
console.log('The sum is ' + n);

function randomNumByRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tryUsePort = async function(port, portAvailableCallback){
    function portUsed(port){
        return new Promise((resolve, reject)=>{
            let server = net.createServer().listen(port);
            server.on('listening',function(){
                server.close();
                resolve(port);
            });
            server.on('error',function(err){
                if(err.code == 'EADDRINUSE'){
                    resolve(err);
                }
            });             
        });
    }
 
    let res = await portUsed(port);
    if(res instanceof Error){
        console.log(`端口：${port}被占用\n`);
        port = randomNumByRange(3000, 4000)
        tryUsePort(port, portAvailableCallback);
    }else{
        portAvailableCallback(port);
    }
}

tryUsePort(3000, (port) => {
    web.listen(port, () => console.log('Web server running on port', port));
})
