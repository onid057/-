package com.a407.back.config;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.apache.commons.io.IOUtils;

public class ImageConfig {

    public static URL toUrl(byte[] input) throws IOException {
        return new URL(IOUtils.toString(new ByteArrayInputStream(input), StandardCharsets.UTF_8));
    }

    public static byte[] toByte(String url) throws IOException {
        return IOUtils.toByteArray(new URL(url));
    }

}
