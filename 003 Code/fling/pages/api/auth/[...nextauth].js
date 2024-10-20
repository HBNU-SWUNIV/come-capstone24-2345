import { connectDB } from "../../../util/database";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { getTokenHandler } from "@/firebase/firebaseDB";

export const authOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "이메일", type: "email" },
        password: { label: "비밀번호", type: "password" },
      },

      //로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null
      async authorize(credentials) {
        let db = (await connectDB).db("Fling");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          // return null;
          throw new Error("이메일이나 비밀번호가 올바르지 않습니다");
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!pwcheck) {
          //   return null;
          throw new Error("이메일이나 비밀번호가 올바르지 않습니다");
        }
        await getTokenHandler(credentials.email);
        return user;
      },
    }),
  ],

  //jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 일주일
  },

  callbacks: {
    //jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 저장하면 jwt에 들어감
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session !== null) {
        const {
          height,
          religion,
          mbti,
          smoking,
          drinkLimit,
          hobby,
          introduction,
          univCert,
        } = session;

        token.user.height = height ?? token.user.height;
        token.user.religion = religion ?? token.user.religion;
        token.user.mbti = mbti ?? token.user.mbti;
        token.user.smoking = smoking ?? token.user.smoking;
        token.user.drinkLimit = drinkLimit ?? token.user.drinkLimit;
        token.user.hobby = hobby ?? token.user.hobby;
        token.user.introduction = introduction ?? token.user.introduction;
        token.user.univCert = univCert ?? token.user.univCert;
      }
      if (user) {
        token.user = {};
        token.user.email = user.email;
        token.user.univ = user.univ;
        token.user.department = user.department;
        token.user.nickname = user.nickname;
        token.user.drinkLimit = user.drinkLimit;
        token.user.gender = user.gender;
        token.user.height = user.height;
        token.user.hobby = user.hobby;
        token.user.religion = user.religion;
        token.user.datingType = user.datingType;
        token.user.mbti = user.mbti;
        token.user.smoking = user.smoking;
        token.user.birth = user.birth;
        token.user.introduction = user.introduction;
        token.user.univCert = user.univCert;
        token.user.army = user.army;
        token.user.chatroomID = user.chatroomID;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  adapter: MongoDBAdapter(connectDB),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
