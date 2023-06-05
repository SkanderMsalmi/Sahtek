const axios = require("axios");

const resolvers = {
  Query: {
    async chatbot(parent, { input }) {
      try {
        const response = await axios.post(
          "https://mediafiles.botpress.cloud/181a1bf4-5403-4d66-a5ee-4e9ee45a6ff5/webchat/bot.html",
          {
            type: "text",
            text: input.text,
            // additional properties as needed
          },
          {
            headers: {
              Authorization: `Bearer bp_pat_Wkj7cUpq83AyKIH8PQGgdgp6pauhBeQiX3OC`,
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return error.response.data;
      }
    },
  },
};

module.exports = resolvers;
