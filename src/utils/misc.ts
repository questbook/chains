import { exec } from 'child_process'
import { promisify } from 'util'

export const execPromise = promisify(exec)

export const execPromiseInDirectory = (
	dir: string,
	cmd: string,
	env?: { [_: string]: string }
) => (
	execPromise(
		`cd ${dir} && ${cmd}`,
		{ env: { ...process.env, ...env || { } } }
	)
)