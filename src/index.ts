import repos from "./repos"
import { addAndPushToRepo, cloneRepo } from "./utils/git"
import { execPromiseInDirectory } from "./utils/misc"
import validateChains from "./utils/validate-chains"

const execute = async(isDryRun: boolean) => {
	if(isDryRun) {
		console.log('dry run, not pushing to repos')
	}

	const chainMap = await validateChains()

	console.log(`got ${Object.keys(chainMap).length} chains`)

	const repoDirectories: { name: string, path: string }[] = []
	for(const { repoName, doCI } of repos) {
		console.log(`cloning ${repoName}...`)
		const repoPath = await cloneRepo(repoName)
		console.log(`cloned ${repoName}, performing CI...`)
		await doCI(
			repoPath,
			chainMap, 
			async cmd => {
				console.log(`running "${cmd}" for ${repoName}...`)
				const result = await execPromiseInDirectory(repoPath, cmd)
				console.log(`ran "${cmd}" for ${repoName}`)
				return result
			}
		)
		console.log(`performed CI for ${repoName}`)

		repoDirectories.push({ name: repoName, path: repoPath })
	}

	if(!isDryRun) {
		console.log('pushing changes to repos...')
		for(const { name, path } of repoDirectories) {
			console.log(`pushing changes to ${name}...`)
			const madeChanges = await addAndPushToRepo(path)
			if(madeChanges) {
				console.log(`pushed changes to ${name}`)
			} else {
				console.log(`no changes to ${name}`)
			}
		}
	}

	console.log('done')
}

const isDryRun = process.argv.includes('--dry-run')
execute(isDryRun)