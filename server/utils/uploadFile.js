const {parse, join} = require('path');
const {createWriteStream} = require('fs');
const fs = require('fs');

module.exports.readFile = async (file) => {
    const {file:{createReadStream, filename}} = await file;
    const stream = await createReadStream();
    console.log(await file.file.filename)
    var {ext,name} = parse(filename);
    name = `profile${Math.floor((Math.random() * 1000000) + 1)}`;
    let url = join(__dirname,`../upload/${name}-${Date.now()}${ext}`);
    const imageStream = await createWriteStream(url);
    await stream.pipe(imageStream);
    url = "http://localhost:5000/"+(url.split('upload')[1].slice(1));
    return url;
}
