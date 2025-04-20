package com.github.alexeysol.geekregime.apicommons.util.storage;

import com.github.alexeysol.geekregime.apicommons.model.properties.AwsProperties;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.SystemPropertyCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.net.URI;
import java.nio.file.Paths;

@Component
public class CloudObjectStorage {
    private final S3Client client;

    public CloudObjectStorage(AwsProperties awsProperties) {
        var accessKeyId = String.format("%s:%s", awsProperties.getS3TenantId(), awsProperties.getKeyId());

        System.setProperty("aws.accessKeyId", accessKeyId);
        System.setProperty("aws.secretAccessKey", awsProperties.getKeySecret());
        System.setProperty("aws.region", awsProperties.getS3Region());

        client = S3Client.builder()
            .credentialsProvider(SystemPropertyCredentialsProvider.create())
            .endpointOverride(URI.create(awsProperties.getS3Endpoint()))
            .build();
    }

    public PutObjectResponse uploadFile(
        String bucketName,
        String key,
        String objectPath
    ) {
        var objectRequest = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();

        return client.putObject(objectRequest, RequestBody.fromFile(Paths.get(objectPath)));
    }
}
