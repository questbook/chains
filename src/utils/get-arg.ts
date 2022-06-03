const argList = process.argv

const getArg = (arg: string) => {
	const argIdx = argList.indexOf(`--${arg}`)
	if(argIdx >= 0) {
		return argList[argIdx + 1]
	}
}

export default getArg