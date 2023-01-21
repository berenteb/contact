import { Toolbar } from "@/app/components/toolbar/Toolbar";
import { ContactListItem } from "@/app/components/contact-list-item/ContactListItem";
import { getContacts } from "@/prisma/contacts";
import { MobileToolbar } from "@/app/components/toolbar/MobileToolbar";

import styles from "./page.module.css";

export default async function Home() {
  const { contacts } = await getContacts();
  return (
    <main>
      <MobileToolbar />
      <Toolbar />
      <div className={styles.centerContent}>
        {contacts?.map((c) => (
          <ContactListItem contact={c} key={c.id} />
        ))}
      </div>
    </main>
  );
}
