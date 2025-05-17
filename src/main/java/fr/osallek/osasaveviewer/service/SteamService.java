package fr.osallek.osasaveviewer.service;

import fr.osallek.osasaveviewer.config.ApplicationProperties;
import fr.osallek.osasaveviewer.service.object.UserInfo;
import fr.osallek.osasaveviewer.service.object.stream.Player;
import fr.osallek.osasaveviewer.service.object.stream.PlayerSummaries;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
public class SteamService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SteamService.class);

    private static final String SUMMARIES_URL = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002";

    private static final String LOGIN_URL = "https://steamcommunity.com/openid/login";

    private final RestTemplate restTemplate;

    private final ApplicationProperties properties;

    private final UserService userService;

    public SteamService(RestTemplate restTemplate, ApplicationProperties properties, @Lazy UserService userService) {
        this.restTemplate = restTemplate;
        this.properties = properties;
        this.userService = userService;
    }

    public Optional<Player> getSteamInfos(String id) {
        try {
            PlayerSummaries summaries = this.restTemplate.getForObject(
                    UriComponentsBuilder.fromUriString(SUMMARIES_URL)
                                        .queryParam("key", this.properties.getSteamApiKey())
                                        .queryParam("steamids", id)
                                        .build()
                                        .toUri(),
                    PlayerSummaries.class);

            return (summaries == null || summaries.getResponse() == null || CollectionUtils.isEmpty(summaries.getResponse().getPlayers())) ?
                   Optional.empty() : Optional.of(summaries.getResponse().getPlayers().getFirst());
        } catch (Exception e) {
            LOGGER.error("An error occurred while getting profile of {} from Steam: {}", id, e.getMessage(), e);
            return Optional.empty();
        }
    }

    public Optional<UserInfo> login(Map<String, String[]> parameterMap) throws IOException {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("openid.mode", "check_authentication");
        parameterMap.forEach((s, strings) -> {
            if (s.startsWith("openid.")) {
                map.addIfAbsent(s, strings[0]);
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(map, headers);

        String s = this.restTemplate.postForObject(LOGIN_URL, entity, String.class);

        if (!StringUtils.contains(s, "is_valid:true")) {
            return Optional.empty();
        }

        String id = parameterMap.get("openid.claimed_id")[0].substring(parameterMap.get("openid.claimed_id")[0].lastIndexOf('/') + 1);

        return Optional.of(this.userService.getOrCreateUserInfo(id));
    }
}
