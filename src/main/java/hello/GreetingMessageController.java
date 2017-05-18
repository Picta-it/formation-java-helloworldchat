package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.apache.log4j.Logger;

@Controller
public class GreetingMessageController {

    private static Logger logger = Logger.getLogger(GreetingMessageController.class);

    @MessageMapping("/greetings")
    @SendTo("/out/greetings")
    public GreetingMessage greeting(GreetingMessage greeting) throws Exception {
        logger.info(greeting.getMessage());

        return new GreetingMessage(greeting.getMessage());
    }
}
