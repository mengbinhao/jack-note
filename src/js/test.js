const chunk = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => {
    return arr.slice(i * size, i * size + size)
  })
}

const arr = [1, 2, 3, 4, 5]

var newArr = chunk(arr, 2)

arr
newArr
