<!--
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-12-16 09:15:23
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-16 11:30:55
 -->
### python 学习案例：

##### 图像识别接口：


```python
import requests
from aip import baidu-aip


image = requests.get('https://res.pandateacher.com/python_classic.png').content

APP_ID = '16149264'
API_KEY = 'yxYg9r4OuAs4fYvfcl8tqCYd'
SECRET_KEY = 'yWg3KMds2muFsWs7MBSSFcgMQl8Wng4s'
client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
res = client.basicGeneral(image)
if 'words_result' in res.keys():
    for item in res['words_result']:
        print(item['words'])

else:
    APP_ID = '11756541'
    API_KEY = '2YhkLuyQGljPUYnmi1CFgxOP'
    SECRET_KEY = '4rrHe2BF828bI8bQy6bLlx1MelXqa8Z7'
    client = AipOcr(APP_ID, API_KEY, SECRET_KEY)
    res = client.basicGeneral(image)
    if 'words_result' in res.keys():
        for item in res['words_result']:
            print(item['words'])
    else:
        print(res)
```

##### 智能机器人
```python
import requests, json, time, random

feature_text = '''
大家好！我是你的聊天机器人吴小枫。

我有问必答，有人会问我“今天深圳天气怎么样？”，也有人问我“你喜欢我吗？”
快来问我问题呀，欢迎来撩！

【温馨提示】如果你要删除自己输入的内容，要按两次删除，才可以删掉一个汉字奥！
（因为在计算机世界里，中文是占两个字符的！）
>'''

user1 = input(feature_text)
time.sleep(1)
userid = str(random.randint(1, 1000000000000000000000))
apikey = 'd81c0b99c260440980a140440be200ec'
#超过1w有风险，19-01-19
tulingdata1 = json.dumps({    "perception": {
        "inputText": {
            "text": user1
        },

    },
    "userInfo": {
        "apiKey": apikey,
        "userId": userid
    }
})
robot1 = requests.post('http://openapi.tuling123.com/openapi/api/v2', tulingdata1)
jsrobot1 = json.loads(robot1.text)['results'][0]['values']['text']
print(jsrobot1)
time.sleep(2)
user2 = input('''
再来问我点啥吧！我把我知道的都告诉你，嘻嘻！
>''')
tulingdata1 = json.dumps({
    "perception": {
        "inputText": {
            "text": user2
        },

    },
    "userInfo": {
        "apiKey": apikey,
        "userId": userid
    }
})
robot1 = requests.post('http://openapi.tuling123.com/openapi/api/v2', tulingdata1)
jsrobot1 = json.loads(robot1.text)['results'][0]['values']['text']
time.sleep(1)
print(jsrobot1)
user3 = input('''
我有点饿了，再和你聊完最后一句，我就要下线啦！你还有什么要问我的？
>''')
tulingdata1 = json.dumps({
    "perception": {
        "inputText": {
            "text": user3
        },

    },
    "userInfo": {
        "apiKey": apikey,
        "userId": userid
    }
})
robot1 = requests.post('http://openapi.tuling123.com/openapi/api/v2', tulingdata1)
jsrobot1 = json.loads(robot1.text)['results'][0]['values']['text']
time.sleep(1)
print(jsrobot1)
time.sleep(1)
print('\n我走啦，下次见！')
```


#### 猜年龄
```python
import random
import time

###提示语部分
print('你好，我是机器人小埋，我们来玩个猜年龄的小游戏吧～(◆◡◆)')
time.sleep(2)

print('''
=============================
   干物妹！うまるちゃんの年齢
=============================
''')
time.sleep(1)


print('小埋的真实年龄在1到10之间哦～')
time.sleep(1)


print('不过，你只有5次机会哦～')
time.sleep(1)


print('下面，请输入小埋的年龄吧：')


#从0至10产生一个随机整数，并赋值给变量age
age = random.randint(1,10)


#设置次数
for guess in range(1,6):
   
   #输入玩家猜测的年龄
    choice=int(input())
    
    #判读玩家输入的年龄是否等于正确的年龄
    if choice<age:
        print('小埋的提示：你猜小了（；´д｀）ゞ。。。。')
                
    elif choice>age:
        print('小埋的提示：乃猜大了惹(＞﹏＜)～～')
            
    else: 
        print('猜了'+str(guess)+'次，你就猜对惹～hiu(^_^A;)～～～')
        break   
                
#判断猜测次数 
if choice  == age:
    print('搜噶～那么小埋下线了～拜拜～（￣︶￣）↗')
    
else:
    print('哎呀～你还是木有猜对啊～但是你只有5次机会诶～怎么办啊～')
    print('那好吧～心软的小埋只好告诉你，我才'+str(age)+'岁哦～(*/ω＼*)')
```