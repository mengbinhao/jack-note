//internal funciton
function swap(arr, indexA, indexB) {
  [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];
}

//for test
const arr = [91, 60, 96, 7, 35, 65, 10, 65, 9, 30, 20, 31, 77, 81, 24];

//bubble sort
function bubbleSort(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
}
console.log("bubbleSort " + bubbleSort(arr));

//设置一标志性变量 pos,用于记录每趟排序中最后一次进行交换的位置。
//由于 pos 位置之后的记录均已交换到位,故在进行下一趟排序时只要扫描到 pos 位置即可。
function bubbleSort2(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let pos = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        pos = j;
        swap(arr, j, j + 1);
      }
    }
    i = pos;
  }
  return arr;
}
console.log("bubbleSort2 " + bubbleSort2(arr));

// 传统冒泡排序中每一趟排序操作只能找到一个最大值或最小值,
// 我们可以 在每趟排序中进行正向和反向两遍冒泡 ，
// 一次可以得到两个最终值（最大和最小） , 从而使外排序趟数几乎减少了一半。
function bubbleSort3(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
      }
    }
    end -= 1;
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i);
      }
    }
    start += 1;
  }
  return arr;
}
console.log("bubbleSort3 " + bubbleSort3(arr));

//缓存 pos、双向遍历的结合：
function bubbleSort4(arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    let endPos = 0;
    let startPos = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        endPos = i;
        swap(arr, i, i + 1);
      }
    }
    end = endPos;
    for (let i = end; i > start; i--) {
      if (arr[i - 1] > arr[i]) {
        startPos = i;
        swap(arr, i - 1, i);
      }
    }
    start = startPos;
  }
  return arr;
}
console.log("bubbleSort4 " + bubbleSort4(arr));


//selection sort
function selectionSort(arr) {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(arr, i, minIndex);
    }
  }
  return arr;
}
console.log("selectionSort " + selectionSort(arr));


//Insertion Sort
function insertionSort(arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    const temp = arr[i];
    let preIndex = i - 1;
    while (arr[preIndex] > temp) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex -= 1;
    }
    arr[preIndex + 1] = temp;
  }
  return arr;
}
console.log("insertionSort " + insertionSort(arr));


//Shell Sort
function shellSort(arr) {
  const len = arr.length;
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    // 注意下面这段 for 循环和插入排序极为相似
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let preIndex = i - gap;
      while (arr[preIndex] > temp) {
        arr[preIndex + gap] = arr[preIndex];
        preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}
console.log("shellSort " + shellSort(arr));


//Merge Sort
function mergeSort(arr) {
  const len = arr.length;
  if (len < 2) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  const result = [];
  while (left.length > 0 && right.length > 0) {
    result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return result.concat(left, right);
}
console.log("mergeSort " + mergeSort(arr));


//Heap Sort
function heapSort(arr) {
  let size = arr.length;
  // 初始化堆，i 从最后一个父节点开始调整，直到节点均调整完毕 
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, i, size);
  }
  // 堆排序：先将第一个元素和已拍好元素前一位作交换，再重新调整，直到排序完毕
  for (let i = size - 1; i > 0; i--) {
    swap(arr, 0, i);
    size -= 1;
    heapify(arr, 0, size);
  }
  return arr;
}

function heapify(arr, index, size) {
  let largest = index;
  let left = 2 * index + 1;
  let right = 2 * index + 2;
  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== index) {
    swap(arr, index, largest);
    heapify(arr, largest, size);
  }
}
console.log("heapSort " + heapSort(arr));


//Quick Sort
function quickSort(arr) {
  const pivot = arr[0];
  const left = [];
  const right = [];

  if (arr.length < 2) {
    return arr;
  }
  for (let i = 1, len = arr.length; i < len; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
console.log("quickSort " + quickSort(arr));

function quickSort2(arr) {
  const pivot = arr.shift();
  const left = [];
  const right = [];
  if (arr.length < 2) {
    return arr;
  }
  arr.forEach((element) => {
    element < pivot ? left.push(element) : right.push(element);
  });
  return quickSort2(left).concat([pivot], quickSort2(right));
}
console.log("quickSort2 " + quickSort2(arr));