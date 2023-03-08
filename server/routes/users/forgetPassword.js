import * as yup from "yup";
import * as bcrypt from "bcryptjs";

// import { ResolverMap } from "../../types/graphql-utils";
// import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
// import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
import { User } from "../../entity/User";
import { userNotFoundError, expiredKeyError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../constants";
import { registerPasswordValidation } from "../../yupSchemas";
import { formatYupError } from "../../utils/formatYupError";
const schema = yup.object().shape({
  newPassword: registerPasswordValidation
});

export const resolvers= {
  
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email },
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return [
          {
            path: "email",
            message: userNotFoundError
          }
        ];
      }

      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key },
      { redis }
    ) => {
      const redisKey = `${forgotPasswordPrefix}${key}`;

      const userId = await redis.get(redisKey);
      if (!userId) {
        return [
          {
            path: "key",
            message: expiredKeyError
          }
        ];
      }

      try {
        await schema.validate({ newPassword }, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatePromise = User.update(
        { id: userId },
        {
          forgotPasswordLocked: false,
          password: hashedPassword
        }
      );

      const deleteKeyPromise = redis.del(redisKey);

      await Promise.all([updatePromise, deleteKeyPromise]);

      return null;
    }
  }}