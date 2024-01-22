package com.a407.back.config;

import java.net.MalformedURLException;
import java.net.URL;

public class ImageConfig {


    public static URL toUrl(byte[] input) throws MalformedURLException {
        return new URL(new String(input));
    }

    public static byte[] toByte(String url) {
        return url.getBytes();
    }

}

