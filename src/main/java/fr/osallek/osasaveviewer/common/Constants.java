package fr.osallek.osasaveviewer.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class Constants {

    private Constants() {
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(Constants.class);

    private static final byte[] HEX_ARRAY = "0123456789ABCDEF".getBytes(StandardCharsets.US_ASCII);

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
