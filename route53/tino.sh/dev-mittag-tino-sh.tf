resource "aws_route53_record" "dev-mittag" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "dev.mittag.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
