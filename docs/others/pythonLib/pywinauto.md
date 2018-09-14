### 1.Install

On windows : pip install pywinauto

### 2.API

url : https://pywinauto.readthedocs.io/en/latest/contents.html

```python
from pywinauto.application import Application
```

### 3.Steps

1. determin backend (win32 or uia)  --> [use spy++ and inspect](https://github.com/blackrosezy/gui-inspect-tool) 

2. determin entry point

   - Application()
   - Desktop()

3. connect progress

   ```python
   app = Application().start(r"D:\Program Files\tlxsoft\屏幕录像专家 共享版 V2017\屏录专家.exe")

   app = Application().connect(process=19188)
   app = Application().connect(handle=0x00230DB6)
   app = Application().connect(path=r"D:\Program Files\tlxsoft\屏幕录像专家 共享版 V2017\屏录专家.exe")
   app = Application().connect(title_re="屏幕录像专家.*", class_name="TMainForm")
   ```

4. select menu

   ```python
   dlg_spec = app.window(title='屏幕录像专家 V2017')
   dlg_spec.menu_select(r"转换工具->EXE/LXE转成MP4")

   dlg_spec.type_keys('%TP')
   ```

### 4.handle controls

> 输入框(Edit)、按钮(Button)、复选框(CheckBox)、单选框(RadioButton)、下拉列表(ComboBox)

- find controls

  ```python
  dlg_spec = app.window(title=r'EXE/EXE 转 MP4')
  dlg_spec = app[r'EXE/EXE 转 MP4']
  dlg_spec.print_control_identifiers()
  ```

- operate controls

  ```python
  edit = dlg_spec['']   # 1
  edit = dlg_spec['Edit2']    # 2
  edit = dlg_spec.Edit2   # 3
  edit.set_text(r'E:\test test .exe')     # 1
  edit.type_keys(r'E:\test test .exe',with_spaces = True) # 2
  MainWin.TypeKeys("%IPS",pause=0.5)
  dlg_spec.Button0.click()
  dlg_spec['浏览'].click()
  app['另存为']['保存'].click()
  dlg_open = app['打开']
  dlg_open.Edit.set_text(r'E:\test test .exe')
  dlg_open['打开'].click()
  ```

- set wait time

  ```python
  import time
  ...
  time.sleep(100)
  app['屏幕录像专家'].Ok.click()


  while(True):
      if app.window(title=r'屏幕录像专家',class_name='TMessageForm').exists():
          break
  app['屏幕录像专家'].Ok.click()

  # recommend
  app.window(title=r'屏幕录像专家',class_name='TMessageForm').Wait('enabled',timeout=300)
  app['屏幕录像专家'].Ok.click()
  ```

