const Community = require("../../database/models/Community");
const { User } = require("../../database/models/User");


const resolvers = {
    Query: {
        async community(_, { id }) {
            return await Community.findById(id);
        },

        async getAllCommunities() {
            return await Community.find().sort({ $natural: -1 })
        },
    },

    Mutation: {
        async createCommunity(_, { name, description }) {
            const createdCommunity = new Community({
                name: name,
                description: description,
                createdAt: new Date(),
                members: [],


            });
            const res = await createdCommunity.save();

            return res;
        },

        deleteCommunity: async (parent, args, context, info) => {
            const { id } = args;
            if (await Community.findByIdAndDelete(id))
                return "Community deleted";
        },

        updateCommunity: async (parent, args, context, info) => {
            const { id } = args;
            const { description } = args
            const { name } = args
            const Community = await Community.findByIdAndUpdate(
                id,
                { description, name },
                { new: true }
            );
            return Community;
        },

        joinCommunity: async (parent, args, context, info) => {
            const { id } = args;
            const { userId } = args;
            const community = await Community.findById(id);
            if (community) {
                if (!community.members.includes(userId)) {
                    community.members.push(userId);
                    await community.save();

                } else
                    throw new Error('You are already a member of this community');

            }
            if (!community) {
                throw new Error("Community not found");

            }
        },








    },

    Community: {

        user: async (parent, args) => {
            return await User.findById(parent.user);
        },





    },
};

module.exports = resolvers;
