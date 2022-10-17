const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const proxyChecker = require('proxy-checker');
const URL = "https://free-proxy-list.net/"; 

async function getProxy() {
    try {
        const response = await axios.get(URL);
        const $=cheerio.load(response.data)
        const proxy = $("textarea").text();
       fs.writeFileSync("proxy.txt", proxy);
    }
    catch(error) {
        console.error(error);
    }
}
getProxy();
fs.writeFileSync('goods.txt',"");

proxyChecker.checkProxiesFromFile(
    'proxy.txt',
    {
        url: 'https://www.google.com',
    },
    function(host, port, ok, statusCode, err) {
        if(statusCode === 200) {
            fs.appendFileSync('goods.txt', `\n${host + ':' + port}`);
        }
        console.log(host + ':' + port + ' => '
            + ok + ' (status: ' + statusCode + ', err: ' + err + ')');
    }
);