import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-[800px]">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
