# DynDNS Setup

> First approche to update my (Route53) DNS with my ISP dynamic IP address.

update apex programmatically all other records are CNAMEs


```shell
[workflow]

 +--------------------+
 | kubernetes cronjob |-----+  <---------------+ <--------------+
 |  dns-updater */5   |     |                  |                |
 +--------------------+     |                  |                |
                            |                  |                |
                            v                  |                |
                    +-----+-------+            |                |
          --------- +  CloudRun   + --------+  |                |
          |         + NodeJs App  +         |  |                |
          V         +-------------+         V  |                |
    /-------------\                   /-------------\           |
 -- |  IP change  |                   |  No change  |           |
 |  \-------------/                   \-------------/           |
 |                                                              |
 |    +--------+--------+     +--------+-------+     +----------+---------+
 +--> + Update Database + --> + Update Route53 + --> + Slack notification +
      +--------+--------+     +--------+-------+     +----------+---------+

```

## notes

kubectl create secret generic dnsupdater --from-literal='API_KEY=abcdefg'
