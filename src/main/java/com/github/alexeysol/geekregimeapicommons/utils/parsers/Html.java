package com.github.alexeysol.geekregimeapicommons.utils.parsers;

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
