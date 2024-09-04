"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CardWrapper from "./CardWrapper";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { register } from "@/action/register";
import { RegisterSchema } from "../../../schema/RegisterSchema";

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);

    register(data).then((res: any) => {
      if (res.error) {
        toast({
          title: "User Registeration Failed",
          description: res.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: res.success,
          description: "Login to access dashboard",
        });
        setLoading(false);
        router.replace(`/login`);
      }
    });
    setLoading(false);
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Register"
        backButtonLabel="Already have an account? Login"
        backButtonHref="/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="default" type="submit" className="w-full py-5">
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <span>Create an account</span>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
