"use client";

import { useState, useEffect } from "react";
import prisma from "@/app/libs/prismadb";
import useSWR from "swr";

import Container from "../components/Container";
import ClientOnly from "../components/ClientOnly";
import useRentModal from "../hooks/useAddModal";
import RentModal from "../components/modals/AddModal";
import ListingTable from "../components/dashboard/ListingTable";

const AdminDashboard = () => {
  const rentModal = useRentModal();

  const handleOpenModal = () => {
    rentModal.onOpen();
  };

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

export default AdminDashboard;
