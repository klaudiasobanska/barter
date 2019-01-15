package pl.barter.mail;

import org.apache.commons.lang3.StringUtils;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Date;
import java.util.Properties;

public class SendEmail {

    private static Properties getProperties(/*String host, String port*/) {
        Properties properties = new Properties();

        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", 587);
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.user", "barterweb.service@gmail.com");
        properties.put("mail.password", "B@rter2018");
        properties.put("mail.transport.protocol", "smtp");
        properties.put("mail.smtp.ssl.trust", "smtp.gmail.com");

        return properties;
    }

    public static void send( String toAddress, String subject, String message,
                                 /*String fromAddress,*/ String toAddressDw) throws MessagingException {


        final Properties properties = getProperties();

        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication((String) properties.get("mail.user"), (String) properties.get("mail.password"));
            }
        };

        Session session = Session.getInstance(properties ,auth);

        Message msg = new MimeMessage(session);

        msg.setFrom(new InternetAddress("barterweb.service@gmail.com"));
        InternetAddress[] toAddresses = InternetAddress.parse(toAddress);
        msg.setRecipients(Message.RecipientType.TO, toAddresses);
        if (StringUtils.isNoneEmpty(toAddressDw)) {
            InternetAddress[] ccAddresses = InternetAddress.parse(toAddressDw);
            msg.setRecipients(Message.RecipientType.CC, ccAddresses);
        }
        msg.setSubject(subject);
        msg.setSentDate(new Date());

        MimeBodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(message, "text/html; charset=UTF-8");

        Multipart multipart = new MimeMultipart();
        multipart.addBodyPart(messageBodyPart);

        msg.setContent(multipart);

        Transport.send(msg);
        session.getTransport().close();

    }

}
