import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { sendResetEmail } from "@/actions/email.actions";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";

const resetPasswordSchema = z.object({
  email: z.string().email(),
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ForgotPasswordForm = ({
  setIsResetPassword,
}: {
  setIsResetPassword: (value: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    setIsSubmitting(true);
    try {
      const res = await sendResetEmail(values.email);
      console.log(res);
      if (res.success) {
        toast.success("Reset email sent");
        setIsResetPassword(false);
      } else {
        toast.error(res.error || "Failed to send reset email");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <BeatLoader size={10} color="white" />
          ) : (
            "Reset Password"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => setIsResetPassword(false)}
        >
          Back to Sign In
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
