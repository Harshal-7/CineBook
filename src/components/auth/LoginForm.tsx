"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LoginSchema } from "../../../schema/LoginSchema";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/action/login";
import CardWrapper from "./CardWrapper";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data)
      .then((res: any) => {
        if (res?.error) {
          toast({
            title: res?.error,
            variant: "destructive",
          });
        } else {
          toast({
            title: "User Logged In Successfully",
          });
        }
      })
      .catch((err: any) => {
        toast({
          title: err.message,
        });
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <div>
      <CardWrapper
        headerLabel="Login"
        backButtonLabel="Don't have an account? Register"
        backButtonHref="/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                <span>Login</span>
              )}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
