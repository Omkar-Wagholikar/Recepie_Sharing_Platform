const { response } = require("express");
// const fetch = require('node-fetch');

exports.makeranklist=async (req,res,next)=>{
    // try{
    //   const response=await axios.get('http://localhost:3001/byrank');
    //   const responseData=response.data;
    //   res.json(responseData);
    // }
    // catch(error){
    //   console.log(error);
    //   res.status(500).json({message: 'Error fetching data from the API'});
    // }
    try {
      const response = await fetch('http://localhost:3001/byrank');
      const responseData = await response.json();
      console.log(responseData)
      res.send(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data from the API' });
    }

}

