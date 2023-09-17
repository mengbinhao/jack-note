let input = document.getElementById('input')
let upload = document.getElementById('upload')
let files = {}
let chunkList = []

// 1. 读取文件
input.addEventListener('change', (e) => {
	files = e.target.files[0]
	chunkList = createChunk(files)
})

// 2. 创建切片
function createChunk(file, size = 1 * 1024 * 1024) {
	const chunkList = []
	let cur = 0
	while (cur < file.size) {
		chunkList.push({
			file: file.slice(cur, cur + size),
		})
		cur += size
	}
	console.log('chunkList', chunkList)
	return chunkList
}

// 3.文件上传
async function uploadFile(list) {
	const requestList = list
		.map(({ file, fileName, index, chunkName }) => {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('fileName', fileName)
			formData.append('chunkName', chunkName)
			return { formData, index }
		})
		.map(({ formData, index }) =>
			// url 为请求地址
			fetch(url, {
				method: 'POST',
				body: formData,
			}).then((res) => {
				console.log(res)
			})
		)
	await Promise.all(requestList)
}

upload.addEventListener('click', () => {
	const uploadList = chunkList.map(({ file }, index) => ({
		file,
		size: file.size,
		percent: 0,
		chunkName: `${files.name}-${index}`,
		fileName: files.name,
		index,
	}))
	uploadFile(uploadList)
})
