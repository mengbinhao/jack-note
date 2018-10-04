### Basic

- ^  The start of the line of text
- $ The end of the line of text
- [...] Range
- \[^...] Not in range
- A|B    Match A or B
- .  Any character except newline
- \w Word character [a-zA-Z0-9_]
- \W Nonword character \[^a-zA-Z0-9_]
- \d Digit character [0-9]
- \D Nondigit character \[^0-9]
- \s Whitespace character [\n\r\f\t]
- \S Nonwhitespace character \[^\n\r\f\t]
- \b Word boundary
- \B Not-word-boundary
- i / m / g Case-insensitive matchin / mutil-line / global match
- (…)  Group subpattern and capture submatch into \1, \2, ..
- \* / \+ / ? Match 0 or more times  / Match 1 or more times  / Match 1 or 0 times
- {n} Match exactly n times
- {n,m} Match n - m times
- *?  / +? / ?? / {x,y}? 非贪婪匹配

### Advance

- a(?<foo>bc)     命名捕获组
- (?: exp)        非捕获性数组
- (?=exp)         正向前瞻
```javascript
    d(?=r)     匹配一个 `d` 并且其后有一个 `r`, 但是 `r` 将不会是整个正则表达式匹配的一部分
    d(?!r)     匹配一个 `d` 并且其后不是一个 `r`, 但是 `r` 将不会是整个正则表达式匹配的一部分
```
- (?!exp)         负向前瞻
- (?<=exp)
```javascript
    (?<=r)d    匹配一个 `d` 并且前面有一个 `r`, 但是 `r` 将不会是整个正则表达式匹配的一部分
    (?<!r)d    匹配一个 `d` 并且前面不是一个 `r`, 但是 `r` 将不会是整个正则表达式匹配的一部分
```
- (?<!exp)
- \1              反向引用
```javascript
    ([abc])\1
    ([abc])([de])\2\1
    (?<foo>[abc])\k<foo>`
```
