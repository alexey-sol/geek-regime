package com.github.alexeysol.geekregime.apicommons.util.file;

import lombok.experimental.UtilityClass;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@UtilityClass
public class FileUtil {
    public File createTempFile(String extension) throws IOException {
        var tempFileName = UUID.randomUUID().toString();
        var tempFile = File.createTempFile(tempFileName, String.format(".%s", extension));
        tempFile.deleteOnExit();

        return tempFile;
    }
}
