resource "aws_route53_record" "argo" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "argo.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}

