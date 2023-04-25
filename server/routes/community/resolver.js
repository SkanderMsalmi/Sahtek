const Community = require("../../database/models/Community");
const { User } = require("../../database/models/User");
const Post = require("../../database/models/Post");
const { MongoClient, ObjectId } = require('mongodb');


const resolvers = {
    Query: {



        async community(_, { id }) {
            return await Community.findById(id);
        },

        async getAllCommunities() {
            return await Community.find().sort({ $natural: -1 })
        },
        async findCommunityByUser(_, { id }) {
            return await Community.find({ members: ObjectId(id) });
        },


    },

    Mutation: {

        async createCommunity(_, { name, description, creator }) {
            function generateRandomColor() {
                const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                return color;
            }
            const existingCommunity = await Community.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
            if (existingCommunity) {
                throw new Error('A community with this name already exists');
            }
            const createdCommunity = new Community({
                name: name,
                description: description,
                createdAt: new Date(),
                members: [],
                creator: creator,
                color: generateRandomColor()

            });
            const res = await createdCommunity.save();

            return res;
        },

        deleteCommunity: async (parent, args, context, info) => {
            const { id } = args;
            await Community.findByIdAndDelete(id)
            return "Community deleted";
        },

        updateCommunity: async (parent, args, context, info) => {
            const { id } = args;
            const { description } = args

            const community = await Community.findByIdAndUpdate(
                id,
                { description },
                { new: true }
            );
            return community;
        },

        joinCommunity: async (parent, args, context, info) => {
            const { id } = args;
            const { userId } = args;
            const community = await Community.findById(id);
            if (community) {
                if (!community.members.includes(userId)) {
                    community.members.push(userId);
                    return await community.save();

                } else
                    throw new Error('You are already a member of this community');

            }
            if (!community) {
                throw new Error("Community not found");

            }
        },


        leaveCommunity: async (parent, args, context, info) => {
            const { id } = args;
            const { userId } = args;
            const community = await Community.findById(id);

            if (community) {
                if (community.members.includes(userId)) {
                    community.members.pull(userId);
                    return await community.save();

                } else
                    throw new Error('You are not a member of this community');

            }
            if (!community) {
                throw new Error("Community not found");

            }
        },







    },

    Community: {

       

        members: async (parent, args) => {
            return await User.find({ _id: { $in: parent.members } });
        },
        posts: async (parent, args) => {
            return await Post.find({ community: parent._id });
        }
        




    },
};

module.exports = resolvers;
