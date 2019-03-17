
// 排序分为 
//     * 交换排序 （冒泡排序，快速排序）
//     * 插入排序 （直接插入排序，希尔排序）
//     * 选择排序 （简单选择排序，堆排序）






var list = [2, 4, 51, 21, 31, 535, 653, 3, 424, 453]

// ## 交换排序

//bubble sort
function bubble_sor(sourceList) {
    var len = sourceList.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (sourceList[j] > sourceList[j + 1]) {
                var tmp = sourceList[j];
                sourceList[j] = sourceList[j + 1];
                sourceList[j + 1] = tmp;
            }
        }
    }
    return sourceList
}


function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
                var temp = arr[j + 1];        // 元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


//quick sort

function quick_sort(arr, left, right) {
    var len = arr.length
    left = typeof left != 'number' ? 0 : left;
    right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        //获取基准值
        var partitionIndex = partition(arr, left, right)
        //只用比较没有基准值的左序列与右序列
        quick_sort(arr, left, partitionIndex - 1)
        quick_sort(arr, partitionIndex + 1, right)
    }
    return arr;
}
//快速获取一个基准值的索引
function quick_partion(arr, left, right) {
    var pivot = left;     //设定基准值
    var index = pivot + 1;  //设定比较索引--替换的最新小于基准值的索引
    for (var i = index; i <= right; i++) {
        //如果有小于基准值，则进行替换
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index)
            index++
        }
    }
    swap(arr, pivot, index - 1)
    return index - 1;
}



function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {     // 分区操作
    var pivot = left,                      // 设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    return index - 1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
























//selection sort
// 选取未排序序列中的最小值，插入有序队列中，从1到n

function selection_sort(arr) {
    len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        var miniindex = i;
        for (var j = i; j < len - 1; j++) {
            if (arr[j] < arr[miniindex]) {
                miniindex = j;
            }
        }
        var tmp = arr[miniindex]
        arr[miniindex] = arr[i];
        arr[i] = tmp;
    }
    return arr;

}





//插入排序（Insertion-Sort）的算法描述是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

//简单插入排序
function insert_sort(arr) {
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        //记录前一个索引
        var preIndex = i - 1;
        //记录当前值
        var current = arr[i];
        //当前一个索引大于等于0时 并且当前一个值大于当前值时，进行更改当前值为前一个值，满足
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]
            preIndex--;
        }
        //当前一个索引小于0时，当前索引为0，将当前值付给索引0
        arr[preIndex + 1] = current;
    }

    return arr;
}




//希尔排序
// 1959年Shell发明，第一个突破O(n2)的排序算法，是简单插入排序的改进版。它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。

// 选择一个增量序列t1，t2，…，tk，其中ti>tj，tk=1；
// 按增量序列个数k，对序列进行k 趟排序；
// 每趟排序，根据对应的增量ti度为m 的子序列，分别对各子表进行直接插入排序。仅增量因子为1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。


function shellSort(arr) {
    var len = arr.length;
    //设置增量 gap为序列的一半，每次循环都为上次的一半
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        //从增量出到序列结尾，进行循环
        for (var i = gap; i < len; i++) {
            //设置当前索引
            var j = i;
            //设置当前值
            var current = arr[i];
            //判断  当j大于等于gap 并且当前值小于
            while (j - gap >= 0 && current < arr[j - gap]) {
                arr[j] = arr[j - gap];
                j = j - gap;
            }
            arr[j] = current;
        }
    }
    return arr;
}

//希尔排序
function shell_sort(arr) {
    var len = arr.length
    for (var gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (var i = gap; i < len; i++) {
            var j = i;
            var current = arr[i];
            //从后向前遍历 增量gap的序列，进行插入排序
            //保证j大于等于gap  
            while (j - gap >= 0 && arr[j - gap] > current) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = current;

        }
    }
    return arr;
}



// 堆排序（Heapsort）是指利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。

var len;

function build_heap_sort(arr) {
    len = arr.length
    //每一层都进行调整，从二叉树最层的父节点开始
    for (var i = Math.floor(len / 2); i >= 0; i--) {
        heap_adjust(arr, i);
    }
}

function heap_adjust(arr, level) {
    var left = 2 * level + 1; //左孩子节点
    var right = 2 * level + 2 //右孩子节点
    var largest = level;  //父节点

    //左孩子与父节点比较，多次比较后，len值为无序列的最大长度，因此只比较到len
    if (left < len && arr[left] > arr[largest]) {
        largest = left;
    }

    //右孩子与父节点比较
    if (right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    //如果最大值不一致，则继续调整
    if (largest != level) {
        //先交换最大值到父节点
        swap(arr, level, largest);
        //继续调整交换后子节点的堆为最大堆
        heap_adjust(arr, largest);
    }
}

function heapSort(arr) {
    //调整后，最大值为头结点
    build_heap_sort(arr);

    //遍历数组节点，此时第一个元素为堆顶最大节点
    for (var i = arr.length - 1; i > 0; i--) {
        //交换最后一个子节点与第一个节点位置 ，保持最后一位是最大值
        swap(arr, 0, i);
        //待排序序列-1
        len--;
        //在第一级别调整
        heap_adjust(arr, 0);
    }
    return arr;
}







//归并
//二路归并，多路归并排序  https://www.cnblogs.com/onepixel/articles/7674659.html

function merge_sort(arr) {
    var len = arr.length
    if (len < 2) {
        return arr;
    }

    var index = Math.floor(len / 2),
        left = arr.slice(0, index),
        right = arr.slice(index);

    return merge(merge_sort(left), merge_sort(right))
}

function merge(left, right) {
    var result = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }

    while (left.length > 0) {
        result.push(left.shift())
    }

    while (right.length > 0) {
        result.push(right.shift())
    }


    return result;
}



//计数排序
// 输入数据必须是有确定范围的整数
function count_sort(arr, maxVualue) {
    var outIndex = 0,
        len = arr.length,
        bucket = new Array(maxVualue + 1),//从1开始所以要加1
        buck_len = maxVualue + 1;

    for (var i = 0; i < len; i++) {
        if (!bucket[arr[i]]) {
            //初始化元素个数为0
            bucket[arr[i]] = 0
        }
        //只要存在对应位置的元素，进行加1
        bucket[arr[i]]++;
    }

    for (var j = 1; j < buck_len; j++) {
        while (bucket[j] > 0) {
            //将索引赋值
            arr[outIndex++] = j
            //将该位置的元素个数-1
            bucket[j]--
        }
    }

    return arr;

}


//桶排序



function bucket_sort(arr, bucket_size) {

    var DEFAULT_SIZE = 100, len = arr.length;
    var bucketSize = bucket_size || DEFAULT_SIZE;
    var miniVuale = arr[0], maxVualue = arr[0];

    //获取最大值最小值
    for (var i = 0; i < len; i++) {
        if (arr[i] < miniVuale) {
            miniVuale = arr[i]
        } else if (arr[i] > maxVualue) {
            maxVualue = arr[i]
        }
    }


    //桶的初始化
    var count = Math.floor((maxVualue - miniVuale) / bucketSize) + 1;
    var bucket = new Array(count)
    for (var i = 0; i < bucket.length; i++) {
        bucket[i] = [];
    }
    //使用映射函数将数据放到具体的桶中
    for (var i = 0; i < len; i++) {
        var index = Math.floor((arr[i] - miniVuale) / bucketSize)
        console.log(index)
        bucket[index].push(arr[i])
    }
    //使用插入排序快速获取到有序队列
    arr.length = 0
    for (var i = 0; i < bucket.length; i++) {
        if (bucket[i].length > 0) {
            var tmp = insert_sort(bucket[i])
            for (var j = 0; j < tmp.length; j++) {
                arr.push(tmp[j])
            }
        }
    }
    return arr;
}



//基数排序
//512   2
//10 /10 1

/**
 * 
 * @param {待排序数组} arr 
 * @param {最大数的位数，例如：233 ，该值为3} maxDigit 
 */
function radix_sort(arr, maxDigit) {
    var count = [];
    //本排序为LSD （Least Significant Digit first）最低位优先，还有MSD(Most Significant Digit first) 
    var mod = 10, dev = 1;

    //首先精度为0   取模为10  dev为10   
    for (var i = 0; i < maxDigit; i++ , mod *= 10, dev *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var index = parseInt(arr[j] % mod / dev);
            if (count[index] == null) {
                count[index] = []
            }
            count[index].push(arr[j])
        }
        var pos = 0;
        //每一轮，都会将具体位（个位、十位、百位）的数进行排序
        for (var k = 0; k < count.length; k++) {
            if (count[k] != null) {
                while ((value = count[k].shift()) != null) {
                    arr[pos++] = value;
                }
            }
        }
    }
    return arr;
}







//交换排序
//  var arr=bubble_sor(list)
//  var arr=quick_sort(list);

//插入排序
//  var arr=insert_sort(list);
//  shellSort(list)
var arr = shell_sort(list)

//归并排序，两路归并与多路归并
//   var arr=merge_sort(list);

//选择排序
//  var arr=selection_sort(list)
//   var arr=heapSort(list);

//非比较排序
//  var arr=count_sort(list,653);
//   var arr=bucket_sort(list)
//  var arr=radix_sort(list,3)


console.log(arr)


