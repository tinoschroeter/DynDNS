resource "aws_route53_record" "txt" {
  zone_id = data.aws_route53_zone.tino.zone_id
  name    = "${data.aws_route53_zone.tino.name}"
  type    = "TXT" 
  ttl     = "1000"
  records = [
            "Because theres nothing you cant fix with a Bash Script", 
            "Was geht ab?"
            ]
}
