"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/UI/button";
import { Input } from "@/components/UI/input";
import { FormError } from "../form.error";
import { FormSuccess } from "../form.success";
import { CardWrapper } from "../auth/card.wrapper";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/UI/form";
import { SignInSchema, TLoginUser } from "@/schemas/Auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUserDataLogin } from "@/store/reducers/user.slice";
import { useAppDispatch } from "@/store/hooks";

const LoginForm = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TLoginUser>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginUser) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      dispatch(fetchUserDataLogin(values)).then((data) => {
        if (data.type === "user/login/fulfilled") router("/")
        if (data.type === "user/login/rejected") setError(data.payload as string);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your email"
                      type="email"
                      className="text-black"
                    />
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
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your password"
                      type="password"
                      className="text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
