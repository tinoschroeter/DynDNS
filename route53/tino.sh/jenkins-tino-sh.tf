resource "aws_route53_record" "jenkins" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "jenkins.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
