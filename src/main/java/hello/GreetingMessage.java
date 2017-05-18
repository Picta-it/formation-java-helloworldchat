package hello;

public class GreetingMessage {
    private String message;

    public GreetingMessage() {
    }

    public GreetingMessage(String name) {
        this.message = name + " logged in";
    }

    public String getMessage() {
        return message;
    }

}
