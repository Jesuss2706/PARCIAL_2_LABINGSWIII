package com.unicauca.parcial2.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Pattern;

public class FlexiblePasswordEncoder implements PasswordEncoder {

    private static final Pattern BCRYPT = Pattern.compile("^\\$2[aby]?\\$\\d{2}\\$[./A-Za-z0-9]{53}$");

    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    @Override
    public String encode(CharSequence rawPassword) {
        return bcrypt.encode(rawPassword);
    }

    @Override
    public boolean matches(CharSequence rawPassword, String storedPassword) {
        if (rawPassword == null || storedPassword == null) {
            return false;
        }
        if (isEncoded(storedPassword)) {
            return bcrypt.matches(rawPassword, storedPassword);
        }
        return storedPassword.equals(rawPassword.toString());
    }

    @Override
    public boolean upgradeEncoding(String storedPassword) {
        return storedPassword != null && !isEncoded(storedPassword);
    }

    public static boolean isEncoded(String password) {
        return password != null && BCRYPT.matcher(password).matches();
    }
}