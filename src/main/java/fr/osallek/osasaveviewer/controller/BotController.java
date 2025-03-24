package fr.osallek.osasaveviewer.controller;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.controller.dto.BotSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.NameDTO;
import fr.osallek.osasaveviewer.controller.dto.save.CountryDTO;
import fr.osallek.osasaveviewer.controller.dto.save.Eu4Language;
import fr.osallek.osasaveviewer.controller.dto.save.ExtractorSaveDTO;
import fr.osallek.osasaveviewer.controller.dto.save.ImageLocalised;
import fr.osallek.osasaveviewer.controller.dto.save.WarDTO;
import fr.osallek.osasaveviewer.service.SaveService;
import fr.osallek.osasaveviewer.service.UserService;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/bot")
public class BotController {

    private static final String TEMPLATE = """
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="utf-8"/>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <meta name="theme-color" content="#000000"/>
                    <meta name="keywords" content="Osallek">
                    <meta
                            name="description"
                            content="Osa SavePage Viewer, is a web tool to analyse and view data graphs from your Europa Universalis IV saves"
                    />
                    <meta property="og:title" content="{TITLE}"/>
                    <meta property="og:description" content="Osa SavePage Viewer, is a web tool to analyse and view data graphs from your Europa Universalis IV saves"/>
                    <meta property="og:image" content="{IMAGE}"/>
                    <meta property="og:site_name" content="Osa Save Viewer"/>
                    <meta property="og:url" content="https://eu4.osallek.net/{URL}"/>
                        
                    <link rel="manifest" href="/manifest.json"/>
                    <title>{TITLE}</title>
                </head>
                <body>
                    <div></div>
                </body>
            </html>
            """;

    private final UserService userService;

    private final SaveService saveService;

    private final ApplicationProperties applicationProperties;

    public BotController(UserService userService, SaveService saveService, ApplicationProperties properties) {
        this.userService = userService;
        this.saveService = saveService;
        this.applicationProperties = properties;
    }

    @GetMapping(value = "/user/{userId}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> user(@PathVariable("userId") String id) throws IOException {
        Optional<UserInfo> userInfo = this.userService.getUserInfo(id);

        if (userInfo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String url = "user/" + id;
        String title = userInfo.get().getName();
        String image = userInfo.get().getImage();

        return ResponseEntity.ok(TEMPLATE.replace("{URL}", url).replace("{TITLE}", title).replace("{IMAGE}", image));
    }

    @GetMapping(value = "/save/{saveId}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> save(@PathVariable("saveId") String id) throws IOException {
        BotSaveDTO save = this.saveService.readBotSave(id);

        if (save == null) {
            return ResponseEntity.notFound().build();
        }

        String url = "save/" + id;
        String title = save.getName();
        String image = this.applicationProperties.getFrontUrl() + "/data/saves/" + id + ".png";

        return ResponseEntity.ok(TEMPLATE.replace("{URL}", url).replace("{TITLE}", title).replace("{IMAGE}", image));
    }

    @GetMapping(value = "/save/{saveId}/warfare/{id}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> saveWar(@PathVariable("saveId") String id, @PathVariable("id") int warId) throws IOException {
        BotSaveDTO save = this.saveService.readBotSave(id);

        if (save == null) {
            return ResponseEntity.notFound().build();
        }

        Optional<NameDTO> war = Optional.ofNullable(save.getWars().get(warId));

        if (war.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String url = "save/" + id + "/war/" + warId;
        String title = save.getName() + " - " + war.get().getName();
        String image = this.applicationProperties.getFrontUrl() + "/data/saves/" + id + ".png";

        return ResponseEntity.ok(TEMPLATE.replace("{URL}", url).replace("{TITLE}", title).replace("{IMAGE}", image));
    }

    @GetMapping(value = "/save/{saveId}/{tag}", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> saveCountry(@PathVariable("saveId") String id, @PathVariable("tag") String tag) throws IOException {
        BotSaveDTO save = this.saveService.readBotSave(id);

        if (save == null) {
            return ResponseEntity.notFound().build();
        }

        Optional<ImageLocalised> country = Optional.ofNullable(save.getCountries().get(tag));

        if (country.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        String url = "save/" + id + "/" + tag;
        String title = save.getName() + " - " + country.get().getLocalisations().getOrDefault(Eu4Language.ENGLISH, tag);
        String image = this.applicationProperties.getFrontUrl() + "/" + country.map(ImageLocalised::getImage).map(s -> "data/flags/" + s + ".png").orElse("extractor_en.png");

        return ResponseEntity.ok(TEMPLATE.replace("{URL}", url).replace("{TITLE}", title).replace("{IMAGE}", image));
    }
}
