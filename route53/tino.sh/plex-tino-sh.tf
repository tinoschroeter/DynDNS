resource "aws_route53_record" "plex" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "plex.${data.aws_route53_zone.tino.name}"
  type    = "CNAME"
  ttl     = "${var.ttl}"
  records = ["tino.sh."]
}
