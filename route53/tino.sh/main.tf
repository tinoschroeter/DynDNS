provider "aws" {
 profile = "default"
 region  = "eu-central-1"
}

data "aws_route53_zone" "tino" {
  name         = "tino.sh."
  private_zone = false
}

variable "ttl" {
  description = "TTL record"
  default = 600
}

# https://medium.com/@matzhouse/dynamic-dns-with-terraform-and-route53-3fafe7c68970
# ["${chomp(data.http.ispip.body)}"]
# https://ipservice-6cr7xv5ksq-lm.a.run.app|jq .addr.ip

#data "http" "ispip" {
#  url = "https://ispip.tino.sh"
#  #url = "https://ipservice-6cr7xv5ksq-ew.a.run.app"
#
#  request_headers = {
#    "Accept" = "application/json"
#  }
#}
#
#output "DSL-Router-IP" {
#    #value = data.http.ispip.body
#    value = jsondecode(data.http.ispip.body).addr.ip
#}
