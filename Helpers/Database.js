const fs = require("fs");

class Database {
    constructor(location = "Database", name = "All.json"){
        if(location == "Database" && !fs.existsSync(`${__dirname}/Database`))
        {
            fs.mkdirSync(`${__dirname}/Database`, {recursive: true});
        }
        else if(!fs.existsSync(`${location}`))
            {fs.mkdirSync(`${__dirname}/${location}`, {recursive: true});}
        let filePath = `${__dirname}/${location}/${name}.json`;
        if(!fs.existsSync(filePath))
            fs.closeSync(fs.openSync(filePath, 'w'));
        this.FilePath = filePath;
        this.Location = location;
    }
    add(path, value){
        let data = this.get(path);
        if(typeof data == "number") data += Number(value);
        else data = Number(value);
        this.set(path, data);
        return data;
    }
    get(path){
        let data = this.read(), result = undefined;
        if(!data) data = {};
        result = _get(path, data);
        return result ? result : undefined;
    }
    set(path, value){
        let data = this.read();
        if(!data) data = {};
        data = _set(path, value, data);
        fs.truncateSync(this.FilePath);
        fs.writeFileSync(this.FilePath, JSON.stringify(data), {encoding: "utf-8"});
        return data;
    }
    sub(path, value){
        let data = this.get(path);
        if(typeof data == "number") data -= Number(value);
        else data = Number(value);
        this.set(path, data);
        return data;
    }
    read(){
        let data = fs.readFileSync(this.FilePath, {encoding: "utf-8"});
        if(!data || (data && data == null)) return {};
        let obj = JSON.parse(data);
        return obj;
    }
}

function _set(path, value, obj = undefined){
    if(obj == undefined) return undefined;
    let locations = path.split("."), output = {};
    output = obj;
    let ref = output;
    for (let index = 0; index < locations.length - 1; index++) {
        if(!ref[locations[index]])
            ref = ref[locations[index]] = {};
        else
            ref = ref[locations[index]];
    }
    ref[locations[locations.length - 1]] = value;
    return output;
}

function _get(path, obj = {}){
    let locations = path.split("."), ref = obj;
    for (let index = 0; index < locations.length - 1; index++) {
        ref = ref[locations[index]] ? ref[locations[index]] : undefined;
        if(!ref) return undefined;
    }
    let output = ref[locations[locations.length - 1]];
    return output;
}

module.exports = Database;