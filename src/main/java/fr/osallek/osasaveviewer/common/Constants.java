package fr.osallek.osasaveviewer.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.regex.Pattern;

public final class Constants {

    private Constants() {
    }

    public static final String COOKIE_NAME = "session";

    public static final Pattern SAVE_NAME_PATTERN = Pattern.compile("^[\\da-f]{8}-[\\da-f]{4}-[0-5][\\da-f]{3}-[089ab][\\da-f]{3}-[\\da-f]{12}\\.eu4\\.gz$",
                                                                    Pattern.CASE_INSENSITIVE);

    public static boolean checkPngImage(Path path) throws IOException {
        return checkPngImage(path.toFile());
    }

    public static boolean checkPngImage(File file) throws IOException {
        if (!file.exists() || !file.canRead()) {
            return false;
        }

        if (!file.getName().endsWith(".png")) {
            return false;
        }

        try (FileInputStream is = new FileInputStream(file)) {
            if (is.read() != 137) {
                return false;
            }

            if (is.read() != 80) {
                return false;
            }

            if (is.read() != 78) {
                return false;
            }

            if (is.read() != 71) {
                return false;
            }

            if (is.read() != 13) {
                return false;
            }

            if (is.read() != 10) {
                return false;
            }

            if (is.read() != 26) {
                return false;
            }

            if (is.read() != 10) {
                return false;
            }

            return true;
        }
    }
}
