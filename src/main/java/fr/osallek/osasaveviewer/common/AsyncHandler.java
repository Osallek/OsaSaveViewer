package fr.osallek.osasaveviewer.common;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AsyncHandler {

    @Async
    public void runAsync(Runnable runnable) {
        runnable.run();
    }
}
