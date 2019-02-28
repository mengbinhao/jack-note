### 如何理解“递归”？
你就问前面一排的人他是第几排，你想只要在他的数字上加一，就知道自己在哪一排了。但是，前面的人也看不清啊，所以他也问他前面的人。就这样一排一排往前问，直到问到第一排的人，说我在第一排，然后再这样一排一排再把数字传回来。直到你前面的人告诉你他在哪一排，于是你就知道答案了

### 递归需要满足的三个条件
1. 一个问题的解可以分解为几个子问题的解
2. 这个问题与分解之后的子问题，除了数据规模不同，求解思路完全一样
3. 存在递归终止条件
写递归代码的关键就是找到如何将大问题分解为小问题的规律，并且基于此写出递推公式，然后再推敲终止条件，最后将递推公式和终止条件翻译成代码

### 递归代码要警惕堆栈溢出
```java
// 全局变量，表示递归的深度。
int depth = 0;

int f(int n) {
  ++depth；
  if (depth > 1000) throw exception;

  if (n == 1) return 1;
  return f(n-1) + 1;
}
```

### 递归代码要警惕重复计算
```java
public int f(int n) {
  if (n == 1) return 1;
  if (n == 2) return 2;

  // hasSolvedList 可以理解成一个 Map，key 是 n，value 是 f(n)
  if (hasSolvedList.containsKey(n)) {
    return hasSovledList.get(n);
  }

  int ret = f(n-1) + f(n-2);
  hasSovledList.put(n, ret);
  return ret;
}
```