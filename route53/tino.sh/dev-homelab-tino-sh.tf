resource "aws_route53_record" "dev-homelab" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "dev.homelab.${data.aws_route53_zone.tino.name}"
  type    = "CNAME" 
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
