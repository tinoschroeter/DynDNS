# DynDNS Setup

[![Build Status](https://jenkins.tino.sh/buildStatus/icon?job=DynDNS%2Fmaster)](https://jenkins.tino.sh/job/DynDNS/job/master/)
![last-commit](https://img.shields.io/github/last-commit/tinoschroeter/DynDNS.svg?style=flat)
[![GitHub Super-Linter](https://github.com/tinoschroeter/DynDNS/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/tinoschroeter/DynDNS/actions/workflows/linter.yml)
[![k3s](https://img.shields.io/badge/run%20on%20-Raspberry%20Pi-red)](https://github.com/tinoschroeter/k8s.homelab)

> First approach to update (Route53) DNS with my ISP dynamic IP address.

...update apex programmatically all other records are CNAMEs managed by terraform.


```js
[workflow]

 +--------------------+
 | Kubernetes Cronjob |-------+  <-------------+  <-------------+
 |  dns-updater */5   |       |                |                |
 +--------------------+       |                |                |
                              |                |                |
                              v                |                |
                      +-------+-----+          |                |
             +------- +  CloudRun   + ------+  |                |
             |        +  Function   +       |  |                |
             v        +-------------+       v  |                |
     /-------------\                   /-------------\          |
 +-- |  IP Change  |                   |  No Change  |          |
 |   \-------------/                   \-------------/          |
 |                                                              |
 |    +--------+--------+     +--------+-------+     +----------+---------+
 +--> + Update Database + --> + Update Route53 + --> + Slack Notification +
      +--------+--------+     +--------+-------+     +----------+---------+

```
## Route 53 

Amazon Route 53 is a highly available and scalable cloud Domain Name System (DNS) web service. 
It is designed to give developers and businesses an extremely reliable and cost effective way to route end users to Internet applications 
by translating names like www.example.com into the numeric IP addresses like 192.0.2.1 that computers use to connect to each other. 
Amazon Route 53 is fully compliant with IPv6 as well.

## Terraform + Atlantis

My domains are managed by [terraform](https://www.terraform.io/) and are applied centrally via [Atlantis](https://www.runatlantis.io/).

![Pull request](https://raw.githubusercontent.com/tinoschroeter/DynDNS/master/docs/atlantis.png)

## Notes

kubectl create secret generic dnsupdater --from-literal='API_KEY=abcdefg'

