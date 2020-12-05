const Joi = require('@hapi/joi');


const registerValidation=(data)=>{
    const schema = Joi.object({
        email: Joi.string()
        .min(6)
        .required()
        .email(),
        password: Joi.string()
        .min(6)
        .required(),
        name: Joi.string()
        .min(6)
        .required()
    })

    return schema.validate(data);
};

const loginValidation=data=>{
    const schema = {
        email: Joi.string()
        .min(6)
        .required(),
        password: Joi.string()
        .min(6)
        .required(),
    }

    return Joi.validate(data,schema);
}


module.exports  = {
    registerValidation,
    loginValidation
}