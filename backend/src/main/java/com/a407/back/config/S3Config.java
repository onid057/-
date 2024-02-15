package com.a407.back.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class S3Config {

    @Value("${cloud.aws.s3.credentials.accessKey}")
    private String ACCESS_KEY;

    @Value("${cloud.aws.s3.credentials.secretKey}")
    private String SECRET_KEY;

    @Value("${cloud.aws.s3.region.static}")
    private String REGION;

    @Bean
    public AmazonS3Client amazonS3Client() {
        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);
        return (AmazonS3Client) AmazonS3ClientBuilder.standard().withRegion(REGION)
            .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
            .build();
    }

}