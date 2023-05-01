import React from "react";

const BotpressChat = () => (
  <div className="container mt-5">
    <iframe
      title="botpress-webchat"
      className="container"
      src="https://mediafiles.botpress.cloud/181a1bf4-5403-4d66-a5ee-4e9ee45a6ff5/webchat/bot.html"
      width="800"
      height="700"
      style={{ border: "none", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
    />
  </div>
);

export default BotpressChat;
