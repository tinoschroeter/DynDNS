# DynDNS Setup

> First approach to update (Route53) DNS with my ISP dynamic IP address.

...update apex programmatically all other records are CNAMEs


```
[workflow]

 +--------------------+
 | kubernetes cronjob |-------+  <-------------+  <-------------+
 |  dns-updater */5   |       |                |                |
 +--------------------+       |                |                |
                              |                |                |
                              v                |                |
                      +-------+-----+          |                |
          ----------- +  CloudRun   + ------+  |                |
          |           +  Function   +       |  |                |
          V           +-------------+       V  |                |
     /-------------\                   /-------------\          |
 +-- |  IP change  |                   |  No change  |          |
 |   \-------------/                   \-------------/          |
 |                                                              |
 |    +--------+--------+     +--------+-------+     +----------+---------+
 +--> + Update Database + --> + Update Route53 + --> + Slack notification +
      +--------+--------+     +--------+-------+     +----------+---------+

```

### notes

kubectl create secret generic dnsupdater --from-literal='API_KEY=abcdefg'

