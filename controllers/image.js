const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '890d054489d343c08b2fb94148183f96'
});
const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with the api'))
}


const handleImage = (req,res, db)=>{
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry=>{
        res.json(entry[0]);
    })
    .catch(err=> res.status(400).json('unable to get entries')) 
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}