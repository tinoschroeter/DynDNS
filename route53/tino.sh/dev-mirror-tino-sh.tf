resource "aws_route53_record" "dev-mirror" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "dev.mirror.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
} 
