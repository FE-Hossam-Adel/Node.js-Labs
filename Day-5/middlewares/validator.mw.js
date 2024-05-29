export default function validator(schemaValidator){
    return function(req,res,nxt){
        let valid = schemaValidator(req.body);

        if(!valid)
        {
            const errors = schemaValidator.errors.reduce((acc, error) => {
                if (error.instancePath) {
                    const field = error.instancePath.substring(1); // remove leading '/'
                    acc[field] = error.message;
                } else if (error.params && error.params.missingProperty) {
                    const field = error.params.missingProperty;
                    acc[field] = error.message;
                }
                return acc;
            }, {});
            return res.status(400).send(errors)
        }
        nxt()
    }
}