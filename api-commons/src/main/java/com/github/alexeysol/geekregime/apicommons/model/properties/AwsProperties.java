package com.github.alexeysol.geekregime.apicommons.model.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties(prefix = "service.aws")
@Component
@Data
public class AwsProperties {
    private String keyId;
    private String keySecret;
    private String s3TenantId;
    private String s3Endpoint;
    private String s3Region;
}
