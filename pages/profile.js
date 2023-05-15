import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        // permanent는 이 redirection이 영구적용인지 임시적용인지를 알려줌
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default ProfilePage;
