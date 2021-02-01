windows安装OpenSSH（两种）
第一种 

使用windows10自带ssh的客户端。（win+i快捷键出现windows设置，应用-管理可选功能，安装openssh客户端。）

第二种

1,下载openSSH[cnblogs.com/GoCircle] windows版

GitHub下载链接   

2，解压到C:\Program Files\OpenSSH，建议是放在此目录下

3，cmd到openSSH路径下

依次执行

1）安装sshd服务

powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1
2）开放22号端口（如果你在windows关闭了防火墙并配置了入站规则可以不执行如下命令，多执行不影响）

netsh advfirewall firewall add rule name=sshd dir=in action=allow protocol=TCP localport=22
3）配置开机自启sshd服务

sc config sshd start= auto
到此就安装完成，建议将C:\Program Files\OpenSSH添加到path中，免得每次都要切到C:\Program Files\OpenSSH才能使用ssh

4，启动ssh服务

net start sshd
 

 

启动ssh

net start sshd