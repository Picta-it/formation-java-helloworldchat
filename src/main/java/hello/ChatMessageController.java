package hello;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.apache.log4j.Logger;

@Controller
public class ChatMessageController {

    private static Logger logger = Logger.getLogger(ChatMessageController.class);

    @MessageMapping("/messages")
    @SendTo("/out/messages")
    public ChatMessage message(ChatMessage message) throws Exception {
        logger.info(message.getContent());

        return new ChatMessage(message.getEmitter(), message.getContent());
    }

}
