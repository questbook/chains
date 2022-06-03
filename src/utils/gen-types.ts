import { compile, compileFromFile } from 'json-schema-to-typescript'
import { readYaml } from "./yaml"
import { chainSchemaYamlFile } from '../config.json'
import path from 'path'
import { writeFile } from 'fs/promises'

const GEN_TYPES_FILE = './src/types/gen.d.ts';

(async() => {
	const schema = await readYaml<any>(chainSchemaYamlFile)
	const result = await compile(schema.ChainData, 'ChainData', { 
		$refOptions: {
			resolve: {
				file: {
					read: (file) => {
						const parsed = path.parse(file.url)
						return schema[parsed.name]
					}
				}
			}
		}
	})
	await writeFile(GEN_TYPES_FILE, result)
})()