const validate = (schema) => async (req, res, next) => {
    try {
        const casted = schema.cast(req.body);
        await schema.validate(casted, { abortEarly: false });
        req.body = casted;
        next();
    }
    catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};
export default validate;
