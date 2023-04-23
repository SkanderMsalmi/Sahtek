import csvToJson from 'csvtojson';

const csvFilePath = 'data.csv';

module.exports.grabItemsFromCsv = async () => {
    return async () => {
        const json = await csvToJson().fromFile(csvFilePath);

        const jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString)

    }

}