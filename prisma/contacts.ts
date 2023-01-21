import { Contact } from "@prisma/client";

import prisma from "@/prisma/index";

export async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany();
    return { contacts };
  } catch (error) {
    return { error };
  }
}

export async function createContact(contactDto: Omit<Contact, "id">) {
  const contact = await prisma.contact.create({
    data: contactDto,
  });
  return { contact };
}

export async function updateContact({
  id,
  ...data
}: Partial<Contact> & { id: number }) {
  const contact = await prisma.contact.update({
    where: {
      id,
    },
    data: data,
  });
  return { contact };
}

export async function deleteContact(id: string) {
  const contact = await prisma.contact.delete({ where: { id: parseInt(id) } });
  return { contact };
}
