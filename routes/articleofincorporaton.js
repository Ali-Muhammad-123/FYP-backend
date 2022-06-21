const ArticleOfIncoporation = require("../models/ArticleOfIncoporation");
const ArticlesOfIncorporation = require("../models/ArticleOfIncoporation");
const { route } = require("./tradeLicense");
const Router = require("express").Router();



Router.post('/articleofincorporation',async (req,res)=>{

    const {client_id, email, name , article ,message} = req.body;

    if( client_id != undefined &&
        email != undefined &&
        name != undefined &&
        article != undefined &&
        message != undefined){

            const articlesOfIncorporation = new ArticlesOfIncorporation({
                Client_id : client_id,
                email : email,
                name : name,
                article : article,
                message : message
            })
            
            await articlesOfIncorporation.save((err)=>{
                if(err){
                    return res.status(400).send(err);
                }
                else{
                    res.status(200).json({
                        message: `article saved`,
                      });  
                }
            })
            
        }else{
            res.status(400).json({
                message: `Invalid Request`,
              }); 
        }


})


Router.get("/articlesofincorporation", async (req, res) => {

    const { client_id } = req.body;

    if(client_id != undefined){

    
  
    var articlesOfIncorporation = await ArticlesOfIncorporation.find({
        
        _Client_id : client_id
    });
  
    if (articlesOfIncorporation && articlesOfIncorporation.length > 0) {
        
      res.status(200).json({
        message: "Sucess",
        articlesOfIncorporation : articlesOfIncorporation
      });
     
    } else {
      res.status(404).json({
        message: "No Record found",
      });
    }


}else{
    res.status(404).json({
        message: "Invalid Reqest",
      });
}
  });

module.exports = Router;
