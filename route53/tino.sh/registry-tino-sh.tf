resource "aws_route53_record" "registry" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "registry.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
