const algolia = require('algoliasearch');

const client = algolia(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_KEY
)

const index = client.initIndex(process.env.ALGOLIA_INDEX);

exports.getSearch = async (req,res)=>{
    try {
        let result = await index.search(req.body.title);
        res.status(200).json(result.hits);
    } catch (error) {
        res.status(200).json(error);  
    }
}