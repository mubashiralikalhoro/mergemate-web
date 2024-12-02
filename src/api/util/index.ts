import User from "../db/models/User";

export const getUserFromDB = async (
  email: string
): Promise<{
  success: boolean;
  user: User | null;
}> => {
  try {
    const user = await User.findOne({
      email,
    });

    if (!!user) {
      return {
        success: true,
        user: await user.toJSON(),
      };
    }
  } catch (e) {}
  return {
    success: true,
    user: null,
  };
};
