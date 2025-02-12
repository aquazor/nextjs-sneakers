import { IUser } from '@/types/user';

async function registerUser(user: IUser) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user,
      }),
    });

    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}

export const userApi = {
  registerUser,
};
