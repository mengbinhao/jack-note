### 1.Beautify  (Beautify `javascript`, `JSON`, `CSS`, `Sass`, and `HTML` in Visual Studio Code)

- [doc](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

- .jsbeautifyrc

- example

  ```
  {
    "indent_size": 4,
    "indent_char": " ",
    "css": {
      "indent_size": 2
    },
    "beautify.language": {
      "js": {
        "type": ["javascript", "json"],
        "filename": [".jshintrc", ".jsbeautifyrc"]
        // "ext": ["js", "json"]
        // ^^ to set extensions to be beautified using the javascript beautifier
      },
      "css": ["css", "scss"],
      "html": ["htm", "html"]
      // ^^ providing just an array sets the VS Code file type
    },
    /* ignore all files named 'test.js' not in the root folder,
     all files directly in any 'spec' directory, and
     all files in any 'test' directory at any depth
    */
    "beautify.ignore": ["*/test.js", "**/spec/*", "**/test/**/*"]

    /* ignore all files ending in '_test.js' anywhere */
    "beautify.ignore": "**/*_test.js"
  }
  ```


### 2.pylint

-   [doc](https://pylint.readthedocs.io/en/latest/)

-   install: pip install pylint

-   invoke : pylint [options] module_or_package    ==note: invoke curent folder==

    ​	pylint ./tpsautomation/model

-   change .pylintrc to config pylint  (eg : reports, only output to console now)

-   some option params

    ```
    -h,--help
    --generate-rcfile
    可以使用 pylint --generate-rcfile 来生成一个配置文件示例。可以使用重定向把这个配置文件保存下来用做以后使用。也可以在前面加上其它选项，使这些选项的值被包含在这个产生的配置文件里。如：pylint --persistent=n --generate-rcfile > pylint.conf，查看 pylint.conf，可以看到 persistent=no，而不再是其默认值 yes。

    --rcfile=<file>
    指定一个配置文件。把使用的配置放在配置文件中，这样不仅规范了自己代码，也可以方便地和别人共享这些规范。
    pylint --generate-rcfile > .pylintrc

    -r <y_or_n>, --reports=<y_or_n>
    默认是 y, 表示 Pylint 的输出中除了包含源代码分析部分，也包含报告部分。

    -f <format>, --output-format=<format>
    设置输出格式。可以选择的格式有 text, parseable, colorized, msvs (visual studio) 和 html, 默认的输出格式是 text。
    ```

-   output

    对于每一个 Python 模块，Pylint 的结果中首先显示一些"*"字符 , 后面紧跟模块的名字，然后是一系列的 message,格式如下：

    `MESSAGE_TYPE: LINE_NUM:[OBJECT:] MESSAGE`

    MESSAGE_TYPE 有如下几种：

    (C) 惯例。违反了编码风格标准

    (R) 重构。写得非常糟糕的代码。

    (W) 警告。某些 Python 特定的问题。

    (E) 错误。很可能是代码中的错误。

    (F) 致命错误。阻止 Pylint 进一步运行的错误。

-   [pylint-message](https://github.com/janjur/readable-pylint-messages/blob/master/README.md)

-   ignore in vscode

    ```
    "python.linting.ignorePatterns": [
            ".vscode/*.py",
            "**/site-packages/**/*.py",
            "**/tpsautomation/test/**/*.py"
     ]
    ```

### 3.eslint

1. install nodejs

2. npm install -g eslint

3. eslint --init   (below json version)

   ```
   {
       "extends": "eslint:recommended",
       "env": {
           "browser": true
       },
       "rules": {
           "no-console": 0,
           "indent": ["error", 4],
           "linebreak-style": "off",
           "semi": ["error", "always"],
           "quotes": ["error", "single"]
       },
       "overrides": [{
           "files": ["bin/*.js", "lib/*.js","test.js","test1.js"],
           "excludedFiles": ["test1.js"],
           "rules": {
               "indent": ["error", 2]
           }
       }],
       "plugins": []
   }
   ```

4. invoke :  eslint index.js

   ​	      eslint index.js --fix

5. .eslintignore

   ```
   # /node_modules/* and /bower_components/* in the project root are ignored by default

   # Ignore built files except build/index.js
   build/*
   !build/index.js
   ```


6. [rules](http://eslint.cn/docs/rules/)      [doc](http://eslint.cn/docs/user-guide/configuring)

### 4.Settings Sync

​    [see link](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

### 5.vscode-icons

### 6.Document This