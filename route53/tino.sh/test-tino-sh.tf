resource "aws_route53_record" "test" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "test.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
