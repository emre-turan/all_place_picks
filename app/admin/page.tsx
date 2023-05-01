"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Container from "../components/Container";
import ClientOnly from "../components/ClientOnly";
import useRentModal from "../hooks/useAddModal";
import RentModal from "../components/modals/AddModal";
import ListingTable from "../components/dashboard/ListingTable";
import withSession from "../components/hoc/WithSession";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const rentModal = useRentModal();

  const handleOpenModal = () => {
    rentModal.onOpen();
  };

  if (status === "loading") {
    return <div>Loading...</div>; // Replace with your loading component or spinner
  }

  if (status === "authenticated" && session?.user.role !== "ADMIN") {
    router.replace("/");
    return null;
  }

  return (
    <ClientOnly>
      <Container>
        <h1 className="text-center text-2xl font-bold underline pt-10 pb-5">
          Admin Dashboard
        </h1>
        <div className="flex justify-center">
          <button
            className="mb-5 px-4 py-2 bg-custom-blue text-white rounded shadow"
            onClick={handleOpenModal}
          >
            Add Listing
          </button>
        </div>
        {rentModal.isOpen && <RentModal />}
        <ListingTable />
      </Container>
    </ClientOnly>
  );
};

export default withSession(AdminDashboard);
