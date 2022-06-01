import { rm, stat } from 'fs/promises'
import { join } from 'path'
import { organisationUrl, tmpFolder } from '../config.json'
import { execPromise, execPromiseInDirectory } from './misc'

export const getRepoUrl = (name: string) => {
	const url = new URL(organisationUrl)
	url.pathname = join(url.pathname, name)
	return url.toString()
}

export const cloneRepo = async(repoName: string, branch?: string) => {
	const repoDirectory = join(tmpFolder, repoName)
	const repoUrl = getRepoUrl(repoName)
	const exists = await stat(repoDirectory).catch(() => {})
	
	if(exists) {
		console.log(`directory for ${repoName} already exists, purging...`)
		await rm(repoDirectory, { recursive: true, force: true })
	}
	
	await execPromise(`git clone --depth 1${branch ? ` -b ${branch}` : ''} ${repoUrl} ${repoDirectory}`)

	return repoDirectory
}

/**
 * Adds any pending changes, and pushes to origin
 * @param repoDirectory Directory of repo to push
 * @returns 
 */
export const addAndPushToRepo = async(repoDirectory: string) => {
	await execPromiseInDirectory(repoDirectory, 'git add .')
	try {
		await execPromiseInDirectory(repoDirectory, "git commit -m 'Updated chains spec'")
		await execPromiseInDirectory(repoDirectory, 'git push origin')
	} catch(err: any) {
		if(err.stdout?.includes('nothing to commit')) {
			return false
		} else {
			throw err
		}					
	}

	return true
}