import Ajv from "ajv";
import addFormats from 'ajv-formats'
import ajvErrors from 'ajv-errors';
const ajv = new Ajv({ allErrors: true, $data: true })
addFormats(ajv);
ajvErrors(ajv);


const roleValidatorSchema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: "^(user|super_admin|admin)$" , errorMessage: "Name must be either 'user', 'super_admin', or 'admin'." },
  },
  required: ["name"],
  additionalProperties: false,
}

const roleValidator = ajv.compile(roleValidatorSchema)
export default roleValidator;
  