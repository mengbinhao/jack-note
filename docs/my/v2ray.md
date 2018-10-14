**目前免费不知道是否以后收费**

1. download
> 1 github search v2ray
>
> 2 [download v2ray and v2ray-core and see doc](https://www.v2ray.com/chapter_00/start.html)
>
> 3 unzip、copy v2ray to v2ray-core

2. GCP
> 1 login GCP
>
> 2 VPC net work network --> change firewall rules (optional)
>
> 3 Computer Enggine -> create --> create --> ssh
>
> 4 config vm
    >
    > sudo -i
    >
    > date -R
    >
    > cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
    >
    > date -R
    >
    > vi /etc/v2ray/config.json  (esc !wq / :q!)
    >
    > 删除原配置 copy新配置
    >
    > sudo systemctl restart v2ray
    >
    > service v2ray status

3. window or Linux (window for example)
> 1 login v2ray.exe
>
> 2 add vmess
> 1
> 3 set actice server
> 1
> enable http proxy -> gloal
![](./images/vmess.png)