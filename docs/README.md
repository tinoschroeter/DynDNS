# DynDNS Setup

![last-commit](https://img.shields.io/github/last-commit/tinoschroeter/DynDNS.svg?style=flat)
[![GitHub Super-Linter](https://github.com/tinoschroeter/DynDNS/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/tinoschroeter/DynDNS/actions/workflows/linter.yml)
[![k3s](https://img.shields.io/badge/run%20on%20-Raspberry%20Pi-red)](https://github.com/tinoschroeter/k8s.homelab)

> First approach to update (Route53) DNS with my ISP dynamic IP address.

...update apex programmatically all other records are CNAMEs


```js
[workflow]

 +--------------------+
 | Kubernetes Cronjob |-------+  <-------------+  <-------------+
 |  dns-updater */5   |       |                |                |
 +--------------------+       |                |                |
                              |                |                |
                              v                |                |
                      +-------+-----+          |                |
          ----------- +  CloudRun   + ------+  |                |
          |           +  Function   +       |  |                |
          v           +-------------+       v  |                |
     /-------------\                   /-------------\          |
 +-- |  IP Change  |                   |  No Change  |          |
 |   \-------------/                   \-------------/          |
 |                                                              |
 |    +--------+--------+     +--------+-------+     +----------+---------+
 +--> + Update Database + --> + Update Route53 + --> + Slack Notification +
      +--------+--------+     +--------+-------+     +----------+---------+

```

## notes

kubectl create secret generic dnsupdater --from-literal='API_KEY=abcdefg'

