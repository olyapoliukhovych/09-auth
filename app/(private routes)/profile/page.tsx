import Link from "next/link";
import Image from "next/image";
import css from "./ProfilePage.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile | NoteHub",
  description:
    "Manage, filter, and organize your notes efficiently with NoteHub.",
};

export default function ProfilePage() {
  //   const user = {
  //     username: "your_username",
  //     email: "your_email@example.com",
  //     avatar: "https://ac.goit.global/default-avatar.png",
  //   };

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
            src="Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: Olya</p>
          <p>Email: olha.poliukhovych.1@gmail.com</p>
        </div>
      </div>
    </main>
  );
}
