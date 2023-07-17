## Docker

[Install using the convenience script](https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script)

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
```

[在 Amazon Linux 2 上安装 Docker](https://docs.aws.amazon.com/zh_cn/AmazonECS/latest/developerguide/create-container-image.html)

```sh
sudo yum update -y
sudo amazon-linux-extras install docker
sudo service docker start
systemctl list-unit-files | grep docker
```

（可选）为确保 Docker 守护进程在每次系统重启后启动，请运行以下命令：

```sh
sudo systemctl enable docker
```

将 ec2-user 添加到 docker 组，以便您能够执行 Docker 命令，而无需使用 sudo。

```sh
sudo usermod -a -G docker ec2-user
```

### proxy

```sh
mkdir -p /etc/systemd/system/docker.service.d
vim /etc/systemd/system/docker.service.d/proxy.conf
```

```
[Service]
Environment="HTTP_PROXY=socks5://user1:pwd@16.162.137.104:51234"
Environment="HTTPS_PROXY=socks5://user1:pwd@16.162.137.104:51234"
```

```sh
systemctl daemon-reload && systemctl restart docker
systemctl show --property=Environment docker
```

### Docker Compose

sudo curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

```sh
curl -L "https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "alias dup='docker-compose up -d'
alias ddown='docker-compose down'
alias drs='docker-compose restart'
alias dps='docker ps'" >> ~/.bashrc

source ~/.bashrc
```

### ctop

- [ctop](https://github.com/bcicen/ctop)

## Prometheus

### Grafana

- [Grafana](https://metrics.marzesport.cn)
- [dashboards](https://grafana.com/grafana/dashboards)
  8919
  10566
  14282

### node_exporter

下载[node_exporter](https://prometheus.io/download/#node_exporter)

```sh
wget https://github.com/prometheus/node_exporter/releases/download/v1.5.0/node_exporter-1.5.0.linux-amd64.tar.gz
sudo tar -C /usr/local/bin -xzf node_exporter-1.5.0.linux-amd64.tar.gz --strip-components=1 node_exporter-1.5.0.linux-amd64/node_exporter
```

这个命令会将 node_exporter-1.5.0.linux-amd64.tar.gz 文件解压缩到 /usr/local/bin 目录，并将其内容直接放置在该目录下（而不是创建一个名为 node_exporter-1.5.0.linux-amd64 的子目录）。--strip-components=1 选项用于跳过第一个目录层级（即 node_exporter-1.5.0.linux-amd64 目录），从而将其中的文件直接提取到指定的目录中。

最后，这个命令还会将被提取的 node_exporter 可执行文件重命名为 node_exporter-1.5.0.linux-amd64（因为默认情况下它们位于一个名为 node_exporter-1.5.0.linux-amd64 的子目录中），并将其移动到 /usr/local/bin 目录中。

需要注意的是，由于此操作需要对 /usr/local/bin 目录进行写入，因此需要使用 sudo 命令以管理员权限运行。

```sh
vim /etc/systemd/system/node_exporter.service
```

```
[Unit]
Description=node_exporter, port 9100
After=network.target

[Service]
User=root
Restart=always
RestartSec=5
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
```

### cAdvisor

[Container Advisor](https://hub.docker.com/r/google/cadvisor)

### add target

prometheus.yml

```yaml
global:
  scrape_interval: 30s
  scrape_timeout: 10s

rule_files:
  - node_rule.yml

alerting:
  alertmanagers:
    - scheme: http
      static_configs:
        - targets: ['alertmanager:9093']

scrape_configs:
  - job_name: self
    metrics_path: /metrics
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: sport
    metrics_path: /metrics
    static_configs:
      - targets: ['47.106.207.249:9100']
```

## references

1. [Prometheus](https://prometheus.io/docs/prometheus/latest/getting_started)
