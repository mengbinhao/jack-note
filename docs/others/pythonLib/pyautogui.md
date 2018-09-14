### Install

On windows : pip install pyautogui

### API

url : https://pyautogui.readthedocs.io/en/latest/introduction.html

```python
import pyautogui
```

#### General Functions

```python
pyautogui.position()  # current mouse x and y
pyautogui.size()  # current screen resolution width and height(1920, 1080)
pyautogui.onScreen(x, y)  # True if x & y are within the screen
```

#### Fail-Safes

```python
pyautogui.PAUSE = 2.5
pyautogui.FAILSAFE = True # When True, moving the mouse to the upper-left will raise a pyautogui.FailSafeException that can abort your program:
```

#### Mouse Functions

```python
pyautogui.moveTo(x, y, duration=num_seconds)  # move mouse to XY coordinates over num_second seconds
pyautogui.moveRel(xOffset, yOffset, duration=num_seconds)  # move mouse relative to its current position
pyautogui.dragTo(x, y, duration=num_seconds)  # drag mouse to XY
pyautogui.dragRel(xOffset, yOffset, duration=num_seconds)  # drag mouse relative to its current position

pyautogui.click(x=moveToX, y=moveToY, clicks=num_of_clicks, interval=secs_between_clicks, button='left') # The button keyword argument can be 'left', 'middle', or 'right'.
pyautogui.rightClick(x=moveToX, y=moveToY) # Keyword args are optional
pyautogui.middleClick(x=moveToX, y=moveToY) # Keyword args are optional
pyautogui.doubleClick(x=moveToX, y=moveToY) # Keyword args are optional
pyautogui.tripleClick(x=moveToX, y=moveToY) # Keyword args are optional

pyautogui.scroll(amount_to_scroll, x=moveToX, y=moveToY) # Positive scrolling will scroll up, negative scrolling will scroll down
pyautogui.mouseDown(x=moveToX, y=moveToY, button='left')
pyautogui.mouseUp(x=moveToX, y=moveToY, button='left')
```

#### Keyboard Functions

The full list of key names is in **pyautogui.KEYBOARD_KEYS**

```python
pyautogui.typewrite('Hello world!\n', interval=secs_between_keys)  # useful for entering text, newline is Enter
pyautogui.typewrite(['a', 'b', 'c', 'left', 'backspace', 'enter', 'f1'], interval=secs_between_keys)

pyautogui.hotkey('ctrl', 'c')  # ctrl-c to copy
pyautogui.hotkey('ctrl', 'v')  # ctrl-v to paste
pyautogui.keyDown('shift')  # hold down the shift key
pyautogui.press('left')     # press the left arrow key
pyautogui.keyUp('shift')    # release the shift key
```

#### Screenshot Functions

```python
im1 = pyautogui.screenshot()  # returns a Pillow/PIL Image object
im2 = pyautogui.screenshot('foo.png')  # pass file name
im = pyautogui.screenshot(region=(0,0, 300, 400))

# grayscale=True
# These local functions return None if the image couldn’t be found on the screen.
locations = pyautogui.locateOnScreen('looksLikeThis.png')  # returns (left, top, width, height) of first place it is found like(863, 417, 70, 13)
# then locate center of locations
centerLocations = pyautogui.center(locations)

# list(pyautogui.locateAllOnScreen('looksLikeThis.png'))
pyautogui.locateAllOnScreen('looksLikeThis.png')

x, y = pyautogui.locateCenterOnScreen('looksLikeThis.png')  # returns center x and y
pyautogui.click(x, y)


pyautogui.pixel(100, 200)
pyautogui.pixelMatchesColor(100, 200, (130, 135, 144))
pyautogui.pixelMatchesColor(100, 200, (140, 125, 134), tolerance=10)
```

#### Message Box Functions

```python
pyautogui.alert('This displays some text with an OK button.')
pyautogui.confirm('This displays text and has an OK and Cancel button.') # 'OK'
password(text='', title='', default='', mask='*')
# The prompt() function will return None if the user clicked Cancel.
pyautogui.prompt('This lets the user type in a string and press OK.') # 'This is what I typed in.'
```