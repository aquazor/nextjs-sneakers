import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { Provider } from 'next-auth/providers';
import { userApi } from './lib/api/user';

const providers: Provider[] = [
  GitHub,
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code',
      },
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (!account) {
        return false;
      }

      if (account.provider === 'google' || account.provider === 'github') {
        const { email, name, image } = user;

        await userApi.registerUser({
          email: email ?? '',
          name: name ?? '',
          image: image ?? '',
        });
      }

      return true;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
});
