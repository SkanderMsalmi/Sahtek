const Product = require("../../../database/models/product");
const { spawn } = require('child_process');

const {
  Patient,
  Therapist,
  User,
  Appointment,
} = require("../../../database/models/User");
function runPythonScript(arg1, arg2) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', ['./routes/shop/cart/search.py', arg1, arg2]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      reject(data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Python script exited with code ${code}`);
      } else {
        const floatValue = parseFloat(output);
        if (isNaN(floatValue)) {
          reject('Invalid output from Python script');
        } else {
          resolve(floatValue);
        }
      }
    });
  });
}
const resolvers = {
  Query: {
    compareImages: async (_, { image1_path }) => {
     const p= await Product.find()
    const matchingProducts=[]
    for(const product of p){
   try {
    const floatValue = await runPythonScript(product.image, image1_path);
    if (floatValue>0.55){
      matchingProducts.push(product)
    }
  } catch (err) {
    console.error(err);
    // or throw a custom error
  }}
  return matchingProducts
      // image1=p1.image
      // image2=p2.image

      // const image1=db+'/therapistF.png'
      // const image2=db+'/therapistF.png'

    //   const { PythonShell } = require('python-shell');
    //   const options = {
    //     mode: 'text',
    //     pythonOptions: ['-u'], 
    //     scriptPath: './routes/shop/cart/',
    //     args: [p1.profileImage,p2.profileImage]
    //   };
    //   PythonShell.run('search.py', options, (err, result) => {
    //       if (err) {
    //         reject(err);
    //         console.log("aaa")
    //       return 22;}
    //       const floatvalue= parseFloat(result[0])
    //         console.log(result[0]);
    //         return floatvalue;
          
      
    //   });
    //  return floatvalue;
    },
  },
  //  getSimilarData : async (_, { image_path, threshold }, { dataSources }) => {
  //   const allData = await dataSources.myDataSource.getAllData();
    
  //   const uploadedImage = loadImage(image_path);
    
  //   const similarData = allData.filter((dataItem) => {
  //     const dataImage = loadImage(dataItem.imagePath);
  //     const score = camp(uploadedImage, dataImage);
  //     return score >= threshold;
  //   });
    
  //   return similarData;
  // }
};
module.exports = resolvers;