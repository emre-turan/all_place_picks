"use client";
import { SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import Avatar from "../components/Avatar";

interface ProfileClientProps {
  currentUser?: SafeUser | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <Heading title="My Profile" paddingTop={10} />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div className="flex items-start">
          <Avatar src={currentUser?.image} size={120} />
          <div className="mt-2 ml-20">
            <h2 className="text-lg font-normal">
              Name: {currentUser?.name || "Placeholder"}
            </h2>
            <hr />
            <h2 className="text-lg font-normal mt-2">
              Email: {currentUser?.email}
            </h2>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
