import Ajv from "ajv";
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors';
const ajv = new Ajv({ allErrors: true, $data: true })
addFormats(ajv);
ajvErrors(ajv);


export const registerValidatorSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, errorMessage: "Name must have at least 2 characters" },
    email: { type: "string", format: "email", errorMessage: "Invalid email format" },
    password: { type: "string" },
    role: { type: "string",
    pattern: "^[0-9a-fA-F]{24}$", // Pattern for MongoDB ObjectId
    errorMessage: "Invalid role id",

    
  }
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
}

export const loginValidatorSchema = {
    type: "object",
    properties: {
      email: { type: "string", format: "email", errorMessage: "Invalid email format" },
      password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false,
  }

const userValidator = (schema)=>{
   return ajv.compile(schema);
}

export default userValidator;
  