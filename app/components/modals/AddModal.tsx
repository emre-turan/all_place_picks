"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import useAddModal from "@/app/hooks/useAddModal";

import Modal from "./Modal";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";

const stepTitles = [
  "Add your Brand!",
  "Add address",
  "Select the Category",
  "Add images of your brand",
  "Where is your brand located?",
];

enum STEPS {
  INFORMATION = 0,
  ADDRESS = 1,
  CATEGORY = 2,
  IMAGES = 3,
  LOCATION = 4,
}

const AddModal = () => {
  const router = useRouter();
  const AddModal = useAddModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.INFORMATION);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      instagram: "",
      phone: "",
      website: "",
      mail: "",
      province: "",
      street: "",
      no: "",
      category: "",
      imageSrc: "",
      locationValue: "",
    },
  });

  const location = watch("location");
  const Category = watch("Category");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.LOCATION) {
      return onNext();
    }
    data.locationValue = location.value;
    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.INFORMATION);
        AddModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFORMATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Information" subtitle="Enter your brand information" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="instagram"
        label="Instagram"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="phone"
        label="Phone"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="website"
        label="Website"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Input
        id="mail"
        label="Mail"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );
  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Add address" subtitle="Enter your brand address" />
        <Input
          id="province"
          label="Province"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="street"
          label="Street"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
        <Input
          id="no"
          label="No"
          disabled={isLoading}
          register={register}
          errors={errors}
        />
      </div>
    );
  }

  if (step === STEPS.CATEGORY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-3
            max-h-[50vh]
            overflow-y-auto
          "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={Category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add images of your brand"
          subtitle="Show customers what your brand looks like"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your brand located?"
          subtitle="Help people find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={AddModal.isOpen}
      title={stepTitles[step]}
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.INFORMATION ? undefined : onBack}
      onClose={AddModal.onClose}
      body={bodyContent}
    />
  );
};

export default AddModal;
