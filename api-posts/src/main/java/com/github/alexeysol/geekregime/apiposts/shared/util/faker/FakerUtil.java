package com.github.alexeysol.geekregime.apiposts.shared.util.faker;

import lombok.Getter;
import lombok.experimental.UtilityClass;
import net.datafaker.Faker;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static com.github.alexeysol.geekregime.apiposts.shared.constant.FakerConstant.*;

@UtilityClass
public class FakerUtil {
    private static final int DEFAULT_MIN_PARAGRAPHS = 1;
    private static final int DEFAULT_MAX_PARAGRAPHS = 10;

    @Getter
    private final Faker faker = new Faker();

    private final Random random = new Random();

    public String generateHtmlParagraphs() {
        return generateParagraphs(DEFAULT_MIN_PARAGRAPHS, DEFAULT_MAX_PARAGRAPHS, "<p>%s</p>");
    }

    public String generateParagraphs(int min, int max) {
        return generateParagraphs(min, max, "%s");
    }

    private String generateParagraphs(int min, int max, String format) {
        List<String> paragraphs = new ArrayList<>();

        for (int i = 0; i < getRandomNumber(min, max); i++) {
            var paragraph = faker.lorem().paragraph(getRandomNumber(2, 10));
            var paragraphHtml = String.format(format, paragraph);
            paragraphs.add(paragraphHtml);
        }

        return String.join(EMPTY, paragraphs);
    }


    public Instant generateCreatedAt() {
        return faker.timeAndDate().past(FIVE_YEARS_IN_MS, TimeUnit.MILLISECONDS);
    }

    public Instant generateUpdatedAt(Instant from) {
        return faker.timeAndDate().between(from, Instant.now());
    }

    public int getRandomNumber(int min, int max) {
        return random.nextInt(max - min) + min;
    }

    public <T> T getRandomElement(List<T> list) {
        return list.get(random.nextInt(list.size()));
    }

    public boolean is50PercentChance() {
        return random.nextBoolean();
    }

    public boolean is75PercentChance() {
        return Math.random() < 0.75;
    }
}
