package com.a407.back.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageConfig {

    @Value("${cloud.aws.s3.bucket}")
    private String BUCKET;

    @Value("${image.prefix}")
    private String PREFIX;

    private final AmazonS3Client amazonS3Client;

    public String resizeImage(MultipartFile originalImage, int size)
        throws IOException {
        String randomFileName =
            UUID.randomUUID().toString() + System.currentTimeMillis() + ".jpg";

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(originalImage.getContentType());
        objectMetadata.setContentLength(originalImage.getSize());
        objectMetadata.setUserMetadata(Map.of("size", String.valueOf(size)));

        amazonS3Client.putObject(
            new PutObjectRequest(BUCKET, randomFileName, originalImage.getInputStream(),
                objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));

        return PREFIX + randomFileName;
    }

    public void deleteImage(String key) {
        amazonS3Client.deleteObject(BUCKET, key.substring(PREFIX.length()));
    }

}
