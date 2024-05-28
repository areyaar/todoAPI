const {z} = require('zod');

const toDoSchema = z.object({
    title: z.string(),
    description: z.string(),
    completed: z.boolean().optional()
})

function validateInput(req, res, next){
    const {title, description} = req.body;
    try{
        toDoSchema.parse({title, description});
        next();
    }catch(err){
        res.status(401).send(err.message)
    }
}

module.exports = validateInput;