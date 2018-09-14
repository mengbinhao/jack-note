### Basic

- [...] Range
- \[^...] Not in range
- .  Any character except newline
- \w Word character [a-zA-Z0-9_]
- \W Nonword character \[^a-zA-Z0-9_]
- \d Digit character [0-9]
- \D Nondigit character \[^0-9]
- \s Whitespace character [\n\r\f\t]
- \S Nonwhitespace character \[^\n\r\f\t]
- ^  The start of the line of text
- $ The end of the line of text
- \b Word boundary
- \B Not-word-boundary
- i / m / g Case-insensitive matchin / mutil-line / global match
- (…)  Group subpattern and capture submatch into \1, \2, ..
- \* / \+ / ? Match 0 or more times  / Match 1 or more times  / Match 1 or 0 times
- {n} Match exactly n times
- {n,m} Match n - m times
- A|B    Match A or B
- *?  / +? / ?? / {x,y}? 非贪婪匹配

### Advance

- (?: exp)   非捕获性数组
- (?=exp)   正向前瞻
- (?!exp)    负向前瞻
- (?<=exp)
- (?<!exp)