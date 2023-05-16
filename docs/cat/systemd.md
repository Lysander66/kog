## systemd

**Systemd 简介**  
Systemd 是一系列工具的集合，其作用也远远不仅是启动操作系统，它还接管了后台服务、结束、状态查询，以及日志归档、设备管理、电源管理、定时任务等许多职责，并支持通过特定事件（如插入特定 USB 设备）和特定端口数据触发的 On-demand（按需）任务。

Systemd 的后台服务还有一个特殊的身份——它是系统中 PID 值为 1 的进程。

Systemd 的 Unit 文件
Systemd 可以管理所有系统资源，不同的资源统称为 Unit（单位）。

在 Systemd 的生态圈中，Unit 文件统一了过去各种不同系统资源配置格式，例如服务的启/停、定时任务、设备自动挂载、网络配置、虚拟内存配置等。而 Systemd 通过不同的文件后缀来区分这些配置文件。

> Systemd 支持的 12 种 Unit 文件类型

```
.automount：用于控制自动挂载文件系统，相当于 SysV-init 的 autofs 服务
.device：对于 /dev 目录下的设备，主要用于定义设备之间的依赖关系
.mount：定义系统结构层次中的一个挂载点，可以替代过去的 /etc/fstab 配置文件
.path：用于监控指定目录或文件的变化，并触发其它 Unit 运行
.scope：这种 Unit 文件不是用户创建的，而是 Systemd 运行时产生的，描述一些系统服务的分组信息
.service：封装守护进程的启动、停止、重启和重载操作，是最常见的一种 Unit 文件
.slice：用于表示一个 CGroup 的树，通常用户不会自己创建这样的 Unit 文件
.snapshot：用于表示一个由 systemctl snapshot 命令创建的 Systemd Units 运行状态快照
.socket：监控来自于系统或网络的数据消息，用于实现基于数据自动触发服务启动
.swap：定义一个用户做虚拟内存的交换分区
.target：用于对 Unit 文件进行逻辑分组，引导其它 Unit 的执行。它替代了 SysV-init 运行级别的作用，并提供更灵活的基于特定设备事件的启动方式
.timer：用于配置在特定时间触发的任务，替代了 Crontab 的功能
```

### demo

1. 将二进制文件 ulive 放入一个固定的目录中

```sh
sudo cp /path/to/ulive /usr/local/bin/
```

2. 使用 systemd 服务来管理 ulive 进程。为此，创建一个新的 systemd unit file，命名为 ulive.service

```sh
sudo vim /etc/systemd/system/ulive.service
```

输入以下内容到 ulive.service 文件

```
[Unit]
Description=ulive Service
After=network.target

[Service]
ExecStart=/usr/local/bin/ulive
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

3. 启用该服务并重新加载 Systemd daemon 配置文件

```sh
sudo systemctl enable ulive.service
sudo systemctl daemon-reload
```

现在，每次系统启动时，ulive 服务将自动启动，并作为后台守护进程运行。您可以使用以下命令手动启动、停止和查看服务状态

```sh
sudo systemctl start ulive.service
sudo systemctl stop ulive.service
sudo systemctl status ulive.service
```

列出自动启动的 systemd 服务

```sh
systemctl list-unit-files --type=service --state=enabled
```

## references

1. [System and Service Manager](https://github.com/systemd)
1. [Systemd 服务](https://cloud.tencent.com/developer/article/1516125)
