"use client";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-y-4">
      <h1 className="text-3xl font-semibold">{label}</h1>
    </div>
  );
};

export default Header;
