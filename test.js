{
  "log": {
      "access": "/var/log/v2ray/access.log",
      "error": "/var/log/v2ray/error.log",
      "loglevel": "warning"
  },
  "inbound": {
      "port": 1888,
      "protocol": "vmess",
      "settings": {
          "clients": [
              {
                  "id": "38fea777-ceab-a260-363c-b3cc11025ba7",
                  "level": 1,
                  "alterId": 103
              }
          ]
      },
      "streamSettings": {
          "network": "kcp"
      },
      "detour": {
          "to": "vmess-detour-174912"
      }
  },
  "outbound": {
      "protocol": "freedom",
      "settings": {}
  },
  "inboundDetour": [
      {
          "protocol": "vmess",
          "port": "10000-10010",
          "tag": "vmess-detour-174912",
          "settings": {},
          "allocate": {
              "strategy": "random",
              "concurrency": 5,
              "refresh": 5
          },
          "streamSettings": {
              "network": "kcp"
          }
      }
  ],
  "outboundDetour": [
      {
          "protocol": "blackhole",
          "settings": {},
          "tag": "blocked"
      }
  ],
  "routing": {
      "strategy": "rules",
      "settings": {
          "rules": [
              {
                  "type": "field",
                  "ip": [
                      "0.0.0.0/8",
                      "10.0.0.0/8",
                      "100.64.0.0/10",
                      "127.0.0.0/8",
                      "169.254.0.0/16",
                      "172.16.0.0/12",
                      "192.0.0.0/24",
                      "192.0.2.0/24",
                      "192.168.0.0/16",
                      "198.18.0.0/15",
                      "198.51.100.0/24",
                      "203.0.113.0/24",
                      "::1/128",
                      "fc00::/7",
                      "fe80::/10"
                  ],
                  "outboundTag": "blocked"
              }
          ]
      }
  }
}