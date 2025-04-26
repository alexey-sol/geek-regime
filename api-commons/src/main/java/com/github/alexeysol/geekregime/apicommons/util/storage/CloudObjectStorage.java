package com.github.alexeysol.geekregime.apicommons.util.storage;

import com.github.alexeysol.geekregime.apicommons.model.properties.AwsProperties;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.SystemPropertyCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.net.URI;
import java.nio.file.Paths;

@Component
public class CloudObjectStorage {
    private final S3Client client;
    private final AwsProperties awsProperties;

    public CloudObjectStorage(AwsProperties awsProperties) {
        this.awsProperties = awsProperties;

        var accessKeyId = String.format("%s:%s", awsProperties.getS3TenantId(), awsProperties.getKeyId());

        System.setProperty("aws.accessKeyId", accessKeyId);
        System.setProperty("aws.secretAccessKey", awsProperties.getKeySecret());
        System.setProperty("aws.region", awsProperties.getS3Region());

        client = S3Client.builder()
            .credentialsProvider(SystemPropertyCredentialsProvider.create())
            .endpointOverride(URI.create(awsProperties.getS3Endpoint()))
            .build();
    }

    public String uploadFile(String bucketName, String key, String objectPath) {
        var request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();
        var body = RequestBody.fromFile(Paths.get(objectPath));

        try {
            client.putObject(request, body);
        } catch (IllegalArgumentException exception) {
            return null;
        }

        var baseUrl = getBaseUrl(bucketName);
        return String.format("%s/%s", baseUrl, key);
    }

    public void deleteFile(String bucketName, String key) {
        var request = DeleteObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();

        try {
            client.deleteObject(request);
        } catch (IllegalArgumentException ignored) {};
    }

    public String getBaseUrl(String bucketName) {
        var splitEndpoint = awsProperties.getS3Endpoint().split("://");
        var scheme = splitEndpoint[0];
        var domainName = splitEndpoint[1];

        return String.format("%s://%s.%s", scheme, bucketName, domainName);
    }
}

// Official S3 code examples: https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javav2/example_code/s3
