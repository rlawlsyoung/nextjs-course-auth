import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    // signOut을 호출하면 Promise를 반환하여 처리가 완료되었음을 알려주지만,
    // useSession을 사용하기 때문에 활성화된 세션에 변화가 있을 때, 컴포넌트가 자동으로 업데이트되고 로그아웃 때도 마찬가지로 업데이트 된다.
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
