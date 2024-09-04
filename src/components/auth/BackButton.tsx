import Link from "next/link";
import { Button } from "../ui/button";

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <button className="font-normal w-full group underline-offset-4 hover:underline h-9 px-4 py-2">
      <Link href={href}>
        <span className="">{label.split("?")[0]}?</span>
        <span className="">{label.split("?")[1]}</span>
      </Link>
    </button>
  );
};

export default BackButton;
