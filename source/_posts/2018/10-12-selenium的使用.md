---
title: selenium的使用
tags:
  - python模块
categories:
  - python
date: 2018-10-12 08:58:58
updated: 2018-10-12 08:58:58

---

### selenium的一些使用

##### Simple test

```python
import time
from selenium import webdriver

driver = webdriver.Chrome('/path/to/chromedriver')  # Optional argument, if not specified will search path.
driver.get('http://www.google.com/xhtml');
time.sleep(5) # Let the user actually see something!
search_box = driver.find_element_by_name('q')
search_box.send_keys('ChromeDriver')
search_box.submit()
time.sleep(5) # Let the user actually see something!
driver.quit()
```

##### 简单交互

```python
# 加载网页
driver.get("http://www.google.com")

# 获取网页元素
element = driver.find_element_by_id("passwd-id")
element = driver.find_element_by_name("passwd")
element = driver.find_element_by_xpath("//input[@id='passwd-id']")

# 输入文本框
element.send_keys("some text")

# 输入按键
element.send_keys(" and some", Keys.ARROW_DOWN)

# 清空文本
element.clear()

```

##### 填写表格
你可以“切换”下拉菜单的状态，并且你可以使用“setSelected”来设置类似于所选OPTION标记的内容。


```python
element = driver.find_element_by_xpath("//select[@name='name']")
all_options = element.find_elements_by_tag_name("option")
for option in all_options:
    print("Value is: %s" % option.get_attribute("value"))
    option.click()
```

正如你所看到的，这不是处理SELECT元素的最有效方式。 WebDriver的支持类包括一个名为“Select”的类，它提供了与这些类交互的有用方法：

```python
from selenium.webdriver.support.ui import Select
select = Select(driver.find_element_by_name('name'))
select.select_by_index(index)
select.select_by_visible_text("text")
select.select_by_value(value)

# WebDriver还提供取消选择所有选定选项的功能：
select = Select(driver.find_element_by_id('id'))
select.deselect_all()

# 假设在测试中，我们需要所有默认选定选项的列表，Select类提供了一个返回列表的属性方法：
select = Select(driver.find_element_by_xpath("//select[@name='name']"))
all_selected_options = select.all_selected_options

# 获取所有可用选项：
options = select.options

# 完成表格填写后，您可能需要提交。一种方法是找到“提交”按钮并点击它：
# Assume the button has the ID "submit" :)
driver.find_element_by_id("submit").click()

# 提交表单
element.submit()
```

##### 高级部分
对于页面的操作来说，最最重要的就是获取元素，以下列出使用时遇到的一些关于获取元素的问题：
- 问题1：模拟登录的时候，获取不到表单中的元素
- 解答：由于很多网页比如淘宝，qq邮箱，网易邮箱，百度账号，网易考拉等等，登录框是由iframe嵌入的，所以没有直接获取是找不到的，需要切换到iframe中。

- 代码：
```python
iframe = login_box.find_element_by_css_selector('iframe')
driver.switch_to.frame(iframe)
```

- 问题2：对于复杂深层的元素，怎样快速准确的获取
- 解答：这个问题其实没有统一的答案，但是我推荐使用google自带的css_selector，可以有效的选择元素，比如我在网易考拉上遇到的问题：

- 代码：

```python
# #j_skuwrap > div.skuBox.clearfix.first-skubox.last-skuBox > div > ul > li:nth-child(1) > a
driver.find_elements_by_css_selector('#j_skuwrap > div.skuBox.clearfix.first-skubox.last-skuBox > div > ul > li:nth-child(1) > a')[0].click()
```
- 问题3：打开一个新的界面，如何跳转

```python
windows = driver.window_handles
driver.switch_to.window(windows[-1])
```

















