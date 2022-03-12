resource "aws_route53_record" "alertmanager" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "alertmanager.${data.aws_route53_zone.tino.name}"
  type    = "CNAME" 
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}

output "ip" {
  value = "${aws_route53_record.alertmanager.records}"
}

