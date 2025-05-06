"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { createContact } from "@/services/contact/contact.services";
import { useRouter } from "next/navigation";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  sendId: z.string().min(1, "Please select an author"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface AuthorData {
  _id: string;
  userId: string;
  authorShopId: {
    fullName: string;
  };
}

interface ContactFormProps {
  data: AuthorData[];
}

export default function ContactForm({ data }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      sendId: "",
      phone: "",
      address: "",
      message: "",
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<ContactFormValues> = async (formData) => {
    const toastId = toast.loading("Logging in...");
    console.log(formData);
    try {
      const result = await createContact(formData);
      if (result?.success) {
        toast.success(result.message || "Send successful", { id: toastId });
        sessionStorage.setItem("justLoggedIn", "true");

        router.push("/");
      } else {
        toast.error(result?.message || "Login failed. Please try again.", {
          id: toastId,
        });
      }
    } catch (error: any) {
      return Error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 ">
      <Card style={{ boxShadow: "1px 1px 20px" }}>
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>You Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        autoComplete="name"
                      />
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
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="your.email@example.com"
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123 Main St, City, Country"
                        autoComplete="address-line1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sendId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Author</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((item) => (
                          <SelectItem key={item._id} value={item.userId}>
                            {item.authorShopId?.fullName || "Unknown Author"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={10}
                        {...field}
                        placeholder="Write your message here..."
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-6" size="lg">
                Send Message
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
