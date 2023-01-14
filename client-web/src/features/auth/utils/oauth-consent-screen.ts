import { t } from "i18next";

import { appConfig } from "@/config/app";

abstract class OauthConsentScreen {
    protected constructor(protected url: string, protected title: string) {}

    openWindow() {
        window.open(this.url, this.title);
    }
}

export class YandexConsentScreen extends OauthConsentScreen {
    constructor() {
        const url = `${appConfig.yandexOauthUrl}?response_type=code`
            + `&client_id=${appConfig.yandexClientId}`
            + "&force_confirm=yes";
        const title = t("oauth.providers.yandex.consentScreen.title");

        super(url, title);
    }
}
