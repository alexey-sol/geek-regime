package com.github.alexeysol.geekregime.apiposts.util.faker;

import lombok.Getter;
import lombok.experimental.UtilityClass;
import net.datafaker.Faker;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import static com.github.alexeysol.geekregime.apiposts.constant.FakerConstant.*;

@UtilityClass
public class FakerUtil {
    @Getter
    private final Faker faker = new Faker();

    private final Random random = new Random();

    public String generateBody() {
        List<String> paragraphs = new ArrayList<>();

        for (int i = 0; i < getRandomNumber(1, 10); i++) {
            var paragraph = faker.lorem().paragraph(getRandomNumber(2, 10));
            var paragraphHtml = String.format("<p>%s</p>", paragraph);
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

    public boolean is50PercentChance() {
        return random.nextBoolean();
    }

    public boolean is75PercentChance() {
        return Math.random() < 0.75;
    }
}
