import Ajv from "ajv"
import addFormats from 'ajv-formats'
import {readYaml} from "./yaml"
import { chainSchemaYamlFile } from '../config.json'

let validate: ((data: any) => void)
/**
 * Fetches the validator for any chain schemas
 */
export default async() => {
	if(!validate) {
		const validatorSchema = await readYaml<any>(chainSchemaYamlFile)
	
		let ajv = new Ajv({ })
		ajv = addFormats(ajv)
		ajv.addFormat('hex', /^0x[0-9a-fA-F]+$/)

		for(const key in validatorSchema) {
			ajv.addSchema(validatorSchema[key], key)
		}
		const _validate = await ajv.getSchema('ChainData')!

		validate = (data: any) => {
			if(!_validate(data)) {
				throw new Error(JSON.stringify(_validate.errors, undefined, 2))
			}
		}
	}

	return validate
}