package com.github.alexeysol.geekregime.apicommons.util.file;

import lombok.experimental.UtilityClass;

import java.awt.image.BufferedImage;

@UtilityClass
public class ImageUtil {
    public BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        var resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        var graphics2D = resizedImage.createGraphics();
        graphics2D.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);
        graphics2D.dispose();
        return resizedImage;
    }
}
