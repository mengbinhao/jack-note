1. 插上硬盘后，查看你的硬盘名称
2. 终端输入`sudo nano /etc/fstab`敲击回车
3. 输入`LABEL=AngleDisk none ntfs rw,auto,nobrowse`敲击回车，再Ctrl+X，再敲击Y，再敲击回车,如果硬盘名称与欧空格`\040`转移
4. 退出移动硬盘重新插入,打开Finder,Command+Shift+G，输入框中输入/Volumes，回车,可以直接把磁盘拖到Finder侧边栏中，这样下次使用就不用进入到/Volumes目录打开了