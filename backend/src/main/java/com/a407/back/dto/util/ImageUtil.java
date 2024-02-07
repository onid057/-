package com.a407.back.dto.util;


import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import marvin.image.MarvinImage;
import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Component
@RequiredArgsConstructor
public class ImageUtil {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${image.prefix}")
    private String prefix;

    private final AmazonS3Client amazonS3Client;

    public String resizeImage(MultipartFile originalImage, int size)
        throws IOException {

        String randomFileName =
            UUID.randomUUID().toString() + System.currentTimeMillis() + ".jpg";

        BufferedImage image = ImageIO.read(originalImage.getInputStream());

        MarvinImage marvinImage = new MarvinImage(image);

        Scale scale = new Scale();
        scale.load();
        scale.setAttribute("newWidth", size);
        scale.setAttribute("newHeight", size);
        scale.process(marvinImage.clone(), marvinImage, null, null, false);

        BufferedImage imageNoAlpha = marvinImage.getBufferedImageNoAlpha();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(imageNoAlpha, "jpg", baos);
        baos.flush();

        CustomMultipartFile resizedImage = new CustomMultipartFile(randomFileName, "jpg",
            originalImage.getContentType(), baos.toByteArray());

        baos.close();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(originalImage.getContentType());
        objectMetadata.setContentLength(resizedImage.getSize());

        amazonS3Client.putObject(
            new PutObjectRequest(bucket, randomFileName, resizedImage.getInputStream(),
                objectMetadata).withCannedAcl(CannedAccessControlList.PublicRead));

        return prefix + randomFileName;
    }

    public void deleteImage(String key) {
        amazonS3Client.deleteObject(bucket, key.substring(prefix.length()));
    }

}
