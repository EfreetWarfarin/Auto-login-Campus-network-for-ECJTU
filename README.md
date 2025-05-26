# Auto-login-Campus-network-for-ECJTU
花椒校园网自动登录脚本
由于我的两台电脑都由于未知原因，无法在校园网登录界面使用记住密码功能，于是在某个夜晚，实现了这个自动登录脚本。

# 使用说明
此脚本用于自动登录华东交通大学校园网
- 1.请将此脚本导入**油猴插件(tampermonkey)**，亦或新建一个脚本，然后把代码粘贴进去。
  这是参考  
  -- [`油猴插件安装`](https://blog.csdn.net/qq_39201211/article/details/146199386?fromshare=blogdetail&sharetype=blogdetail&sharerId=146199386&sharerefer=PC&sharesource=weixin_72139972&sharefrom=from_link)
  --[`添加脚本`](https://get.qiaobuqiao.com/post-1356)
- 2.请在脚本中配置以下参数
    ```javascript
    // 替换成你的账号
    const USERNAME = 'username';
    // 替换成你的密码
    const PASSWORD = 'password';
    // 运营商选项值 '@cmcc' '@unicom' '@telecom'
    const OPERATOR = '@telecom';
    ````  

其中`@cmcc`为中国移动，`@unicom`为中国联通，`@telecom`为中国电信。

# 👆🤓编写测试过程
- 1.本脚本全部由伟大的`ChatGPT`编写，我只是一个测试工具人。
- 2.经过测试，我发现花椒校园网的登录界面可能会检测鼠标的点击事件。具体表现为：在自动填充密码过程中或完成后，点击任意输入框才能成功登录，否则都返回登陆失败。于是我在脚本中加入了模拟点击。
如果以后哪位学弟学妹挖坟挖到了这个仓库，可以研究一下是不是这么回事，我也没咋研究过js，这个脚本权当是娱乐一下。
