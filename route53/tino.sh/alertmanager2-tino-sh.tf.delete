resource "aws_route53_record" "alertmanager2" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "alertmanager2.${data.aws_route53_zone.tino.name}"
  type    = "CNAME" 
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
