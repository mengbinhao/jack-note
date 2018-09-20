### 完整匹配
在Google的输入框里，所有的空格都被理解为加号。如果你输入的是mysql foreign key，那么返回的搜索结果里也许既有mysql存在，也有foreign key存在，但不一定有mysql foreign key存在。另外，过分常用的、单独存在没有意义的词汇往往被忽略掉，比如the/a/that等等。

如果你想要找含有mysql foreign key这个词组的文章，那么你必须在搜索词前后加上引号，输入`"mysql foreign key"`，不管你输入的时候使用的是全角字符（“或者”）还是半角字符（"），Google都照样能够正确处理。这就是引号的作用：返回完整匹配的结果。

### 筛选
为了进一步筛选搜索结果，还需要学会另外一个符号 – 减号（-）。比如，`"mysql foreign key" - "nodejs"`就要求Google返回含有mysql foreign key但不存在nodejs的文章。

### 通配符
另外一个程序员耳熟能详的符号是正则里最常露脸的星号，看到星号就下意识的想到通配符，在Google的搜索规则中也是如此，输入`"mysql connect error *"`就会返回所有已知的关于MySQL连接错误的文章。

### 站内搜索
比如针对程序员查bug，stackoverflow是我个人觉得可信度最高也最全面的一个网站，所以我就经常使用site的魔法，像`"mysql foreign key" site:stackoverflow.com`就会返回对应网站内所有关于mysql foreign key的文章。