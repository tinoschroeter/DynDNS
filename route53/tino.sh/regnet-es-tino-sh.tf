resource "aws_route53_record" "regnet-es-a" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "regnet-es.${data.aws_route53_zone.tino.name}"
  type    = "A"
  ttl     = "120"
  records = ["216.239.32.21", "216.239.34.21", "216.239.36.21", "216.239.38.21"]
}

resource "aws_route53_record" "regnet-es-aaaa" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "regnet-es.${data.aws_route53_zone.tino.name}"
  type    = "AAAA"
  ttl     = "120"
  records = ["2001:4860:4802:32::15", "2001:4860:4802:34::15", "2001:4860:4802:36::15"]
}

resource "aws_route53_record" "regnet-es-txt" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "regnet-es.${data.aws_route53_zone.tino.name}"
  type    = "TXT"
  ttl     = "256"
  records = ["google-site-verification=bIaVDf6F-qm1LmODxp3jl46FoHiQRNTTjUQ_8IP4Uec"]
}
