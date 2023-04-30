import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";

import ProfileClient from "./ProfileClient";

const ListingPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <ProfileClient currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
