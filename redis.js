(async () => {
    function uncaughtExceptionHandler(err){
        if(err && err.code == 'ECONNREFUSED'){
            // do something
        }else{
            process.exit(1);
        }
    }
    process.on('uncaughtException', uncaughtExceptionHandler);
    
    const redis = require('redis');

    const client = redis.createClient({
        url: 'redis://192.168.56.4:6379',
        retry_strategy: function (options) {
            if (options.error.code === 'ECONNREFUSED') {
                // End reconnecting on a specific error and flush all commands with a individual error 
                report('连接被拒绝');
            }
            if (options.times_connected > 10) {
                report('重试连接超过十次');        
            }
            // reconnect after 
            return Math.max(options.attempt * 100, 3000);
        }
    
    });
    client.on('error', function(err) {
        console.log("redis connect err", err)
    });
    try {
        await client.connect();
        await client.set("name", "test");
        client.get('name').then(val => console.log(val));
    } catch(ex) {
        console.log(ex);
    }

    setInterval(async () => {
        try {
            console.log(1);
            await client.set("name", "test");
            client.get('name').then(val => console.log(val));
        } catch(ex) {
            console.log(ex);
        }
    }, 1000)
})();
