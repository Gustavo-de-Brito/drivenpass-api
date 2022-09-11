import joi from 'joi';

const securityCodeRegex:RegExp = /^[0-9]{3}$/;
const dateRegex:RegExp = /^[0-9]{2}\/[0-9]{2}$/;

const cardSchema = joi.object(
  {
    title: joi.string().required(),
    cardNumber: joi.string().creditCard().required(),
    ownerName: joi.string().required(),
    securityCode: joi.string().regex(securityCodeRegex).required(),
    expirationDate: joi.string().regex(dateRegex).required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    cardType: joi.string()
      .valid('credito', 'debito', 'credito-debito').required()
  }
);

export default cardSchema;