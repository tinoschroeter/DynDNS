resource "aws_route53_record" "home" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "home.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = var.ttl
  records = ["tino.sh."]
}
