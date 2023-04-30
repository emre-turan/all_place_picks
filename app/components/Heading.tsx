"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  paddingTop?: number;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  paddingTop,
}) => {
  const paddingTopClass = paddingTop ? `pt-${paddingTop}` : "";

  return (
    <div
      className={`${center ? "text-center" : "text-start"} ${paddingTopClass}`}
    >
      <div className="text-2xl font-normal">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
