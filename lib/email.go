package lib

import (
	"fmt"
	"log"
	"net/smtp"
)

func SendTextEmail(receiverEmail string, text string) error {

	var (
		SMTPHost     = Config.Email.Host
		SMTPPort     = Config.Email.Port
		SMTPUsername = Config.Email.Username
		SMTPPassword = Config.Email.Password
	)
	auth := smtp.PlainAuth("", SMTPUsername, SMTPPassword, SMTPHost)
	message := fmt.Sprintf("From: %s\r\nTo: %s\r\nSubject: %s\r\n\r\n%s", SMTPUsername, receiverEmail, "Go-Resume 认证邮件", "验证码："+text)
	msg := []byte(message)
	err := smtp.SendMail(SMTPHost+":"+SMTPPort, auth, SMTPUsername, []string{receiverEmail}, msg)
	if err != nil {
		log.Fatal("failed to send email:", err)
	}
	return err
}
