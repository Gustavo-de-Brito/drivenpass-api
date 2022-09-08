import joi from 'joi';

function validateUrl(url:string, helper: any) {
  try {
    new URL(url);
    return true;
  } catch {
    return helper.message('A url passada é inválida');
  }
}

const credentialSchema = joi.object(
  {
    title: joi.string().required(),
    url: joi.string().custom(validateUrl).required(),
    userName: joi.string().required(),
    password: joi.string().required()
  }
);

export default credentialSchema;