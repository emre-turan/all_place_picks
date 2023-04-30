import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
  const listings = await prisma.listing.findMany();

  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  console.log("currentUser:", currentUser);

  if (!currentUser) {
    console.log("User not authorized to create a new listing");
    return new Response(
      JSON.stringify({
        error: {
          message: "Unauthorized",
          detail: "The user is not authorized to create a new listing",
        },
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const body = await request.json();
  console.log("request body:", body);
  const {
    name,
    description,
    imageSrc,
    category,
    locationValue,
    instagram,
    phone,
    website,
    mail,
    province,
    street,
    no,
  } = body;

  // Validate required fields explicitly
  const requiredFields = [
    "name",
    "description",
    "imageSrc",
    "locationValue",
    "instagram",
    "phone",
    "category",
    "mail",
    "province",
    "street",
    "no",
  ];
  const missingOrInvalidFields = requiredFields.filter(
    (field) => !body[field] && body[field] !== null
  );

  if (missingOrInvalidFields.length > 0) {
    console.log("Invalid request data:", missingOrInvalidFields);
    return new Response(
      JSON.stringify({
        error: {
          message: "Invalid request data",
          detail: `The following required fields are missing or have invalid values: ${missingOrInvalidFields.join(
            ", "
          )}`,
        },
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const listing = await prisma.listing.create({
    data: {
      name,
      description,
      imageSrc,
      category,
      locationValue,
      instagram,
      phone,
      website,
      mail,
      province,
      street,
      no: parseInt(no),
      user: { connect: { id: currentUser.id } },
    },
  });
  console.log("created listing:", listing);

  return NextResponse.json(listing);
}
