import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Your Profile | NoteHub",
  description:
    "Manage, filter, and organize your notes efficiently with NoteHub.",
};

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p style={{ margin: "10px" }}>Username: {user.username}</p>
          <p style={{ margin: "10px" }}>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
