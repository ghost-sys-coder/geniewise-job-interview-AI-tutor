"use client";
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Form } from "@/components/ui/form"
import Link from 'next/link';
import { toast } from 'sonner';
import FormFieldInput from './FormFieldInput';
import { useRouter } from 'next/navigation';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6)
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        toast.success("Signed in successfully.")
        router.push("/");
      } else {
        toast.success("Account created successfully. Sign in to continue.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.")
    }
  }

  const isSignIn = type === "sign-in";


  return (
    <div className='card-border lg:min-w-[566[px]'>
      <div className="flex flex-col gap-6 py-14 px-16 card">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src={"/logo.svg"}
            alt='logo'
            height={32}
            width={38}
          />
          <h2 className='text-primary-100'>GenieWise</h2>
        </div>
        <h3>Practice job interviews with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 form">
            {isSignIn ? "" : (
              <FormFieldInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your name"
              />
            )}

            <FormFieldInput
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type='email'
            />

            <FormFieldInput
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button type="submit" className='btn'>
              {isSignIn ? "Sign In" : "Create an account"}
            </Button>
          </form>
        </Form>
        <p className='text-center'>
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link className='font-bold text-user-primary ml-1' href={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? "Create an account" : "Sign into your account"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm