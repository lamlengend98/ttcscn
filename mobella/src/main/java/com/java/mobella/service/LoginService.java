package com.java.mobella.service;

import org.springframework.security.crypto.bcrypt.BCrypt;
import com.java.mobella.domain.reponsitory.User;
import com.java.mobella.domain.result.APIResponseBase;
import com.java.mobella.domain.result.Constants;
import com.java.mobella.domain.result.ResultBean;
import com.java.mobella.mapper.LoginMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Jwts;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.SimpleEmail;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpSession;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.sql.Timestamp;
import java.util.Base64;
import java.util.Date;

@Service
public class LoginService {

    protected static final Logger logger = LoggerFactory.getLogger(LoginService.class);
    private static final Key secret = MacProvider.generateKey(SignatureAlgorithm.HS256);
    private static final byte[] secretBytes = secret.getEncoded();
    private static final String base64SecretBytes = Base64.getEncoder().encodeToString(secretBytes);
    private static final long EXPIRATIONTIME = 86400000;
    static final String SECRET = "ThisIsASecret";
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    private static final byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET);
    private static final Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
    private static final Date dateNow = new Date();
    private static final String MY_EMAIL = "lam848520@gmail.com";
    private static final String MY_PASSWORD = "Lam261198";


    @Autowired
    private LoginMapper loginMapper;

    public APIResponseBase login(User user, HttpSession session) {
        logger.info("Service start");
        APIResponseBase responseBase = new APIResponseBase();
        System.out.println("user" + user);
        ResultBean rs = new ResultBean();

        try {
            User user1 = loginMapper.getPassword(user.getUsername());
            System.out.println("password" + user.getPassword().equals(user1.getPassword()));
            if (user1.getPassword() != null && checkPassword(user.getPassword(), user1.getPassword())) {
                User userLogin = loginMapper.login(user1.getId());
                userLogin.setPassword(null);
                rs.setToken(createToken(userLogin));
//                rs.setUser(userLogin);
                session.setAttribute(Constants.SESSION_DATA_USER_ID, userLogin.getId());
                session.setAttribute(Constants.SESSION_DATA_USERNAME, userLogin.getUsername());
                session.setAttribute(Constants.SESSION_DATA_ROLE, userLogin.getRole());
                session.setAttribute(Constants.SESSION_DATA_LOGIN, "OK");
                responseBase.setAPIStatus(Constants.APIStatus.OK);
                responseBase.setResult(rs);
            } else {
                responseBase.setAPIStatus(Constants.APIStatus.ERR_LOGIN_FAILED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        logger.debug("Service end");

        return responseBase;
    }

    public String createToken(User user) {
        System.out.println(user);
        String JWT = Jwts.builder()
                .setIssuer("admin")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("role", user.getRole())
                .setExpiration(new Timestamp(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(signatureAlgorithm, signingKey)
                .compact();

        System.out.println(JWT);

        return JWT;
    }

    public Boolean verifyToken(String jwt, User user) {
        Claims claims = Jwts.parser()
                .setSigningKey(apiKeySecretBytes)
                .parseClaimsJws(jwt).getBody();
        System.out.println("claims" + claims);
        return claims.get("iss").equals("admin") && claims.get("username").equals(user.getUsername()) && claims.get("role").equals(user.getRole());
    }

    public Claims checkToken(String jwt) {
        Claims claims = Jwts.parser()
                .setSigningKey(apiKeySecretBytes)
                .parseClaimsJws(jwt).getBody();
        System.out.println("claims" + claims);
        return claims;
    }

    public APIResponseBase registerOrUpdate(User user) {
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try {
            if (user.getId() > 0)
                loginMapper.updateUser(user);
            else {
                user.setRole("user");
                String hashPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
                user.setPassword(hashPassword);
                loginMapper.register(user);
            }
            res.setAPIStatus(Constants.APIStatus.OK);
        } catch (Exception e) {
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public APIResponseBase verifyAccount(User user) {
        logger.debug("Service start");

        APIResponseBase res = new APIResponseBase();
        try {
            User user1 = loginMapper.verifyAccount(user);
            System.out.println(user1);
            if (user1 != null) {
                sendMail(createToken(user1), user1.getEmail());
                res.setAPIStatus(Constants.APIStatus.OK);
            } else {
                res.setAPIStatus(Constants.APIStatus.ERR_ANY);
                return res;
            }
        } catch (Exception e) {
            res.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return res;
    }

    public void sendMail(String token, String emailUser) {

        try {
            Email email = new SimpleEmail();

            email.setHostName("smtp.googlemail.com");
            email.setSmtpPort(465);
            email.setAuthenticator(new DefaultAuthenticator(MY_EMAIL,
                    MY_PASSWORD));

            email.setSSLOnConnect(true);
            email.setFrom(MY_EMAIL);
            email.setSubject("Khôi phục mật khẩu");
            email.setMsg("Truy cập vào địa chỉ bên dưới để khôi phục mật khẩu: http://localhost:8080/preSchool/html/reset-password.html?token=" + token);

            email.addTo(emailUser);
            email.send();
            System.out.println("Sent");
        } catch (EmailException e) {
            e.printStackTrace();
        }
    }

    public Boolean checkPassword(String password, String hashPassword) {
        System.out.println(password);
        System.out.println(hashPassword);
        if (password != null && hashPassword != null)
            return BCrypt.checkpw(password, hashPassword);
        return false;
    }

    public APIResponseBase resetPassword(String password, String token) {
        APIResponseBase api = new APIResponseBase();
        try {
            Claims user = checkToken(token);
            if (user != null) {
                User user1 = new User();
                String hashPassword = BCrypt.hashpw(password, BCrypt.gensalt(12));
                user1.setUsername(String.valueOf(user.get("username")));
                user1.setEmail(String.valueOf(user.get("email")));
                user1.setPassword(hashPassword);
                loginMapper.resetPassword(user1);
                api.setAPIStatus(Constants.APIStatus.OK);
            } else {
                api.setAPIStatus(Constants.APIStatus.ERR_ANY);
            }
        } catch (Exception e) {
            api.setAPIStatus(Constants.APIStatus.ERR_ANY);
            e.printStackTrace();
        }
        return api;
    }
}
