package com.github.alexeysol.geekregime.apiposts.shared.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

public class Html {
    private final String html;

    public Html(String html) {
        this.html = html;
    }

    public String text() {
        Document document = Jsoup.parse(html);
        return document.text();
    }
}
