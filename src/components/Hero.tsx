import { ArrowDown } from "lucide-react";
import ProductCarousel from "./ProductCarousel";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Hero = () => {
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL); // Debug log
  console.log('Supabase client initialized:', !!supabase); // Debug log

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setStatus(null);
      setErrorMessage("");

      // First add to Supabase waitlist
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setErrorMessage('This email is already on the waitlist.');
        } else {
          setErrorMessage(`Database Error: ${supabaseError.message}`);
        }
        setStatus('error');
        return;
      }

      // If Supabase insert successful, send to Brevo
      const emailResponse = await fetch('/api/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await emailResponse.json();
      console.log('Brevo response:', responseData);

      if (!emailResponse.ok) {
        console.error('Failed to add to Brevo:', responseData);
        throw new Error('Failed to add to Brevo list');
      }

      setStatus('success');
      setEmail('');

    } catch (error) {
      console.error('Caught error:', error);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-24 pb-16 min-h-screen flex items-center bg-gradient-to-b from-secondary/30 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold text-accent leading-tight">
              Glow Naturally: Your Skin's New Best Friend
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              100% organic, dermatologist-approved facial oil for all skin types.
              Transform your skincare routine naturally.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary-hover transition-colors text-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Joining..." : "Join Waitlist"}
                  </button>
                </form>
                <button className="border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary/10 transition-colors text-lg whitespace-nowrap">
                  Learn More
                </button>
              </div>

              {status && (
                <Alert
                  variant={status === "success" ? "default" : "destructive"}
                  className="animate-fadeIn"
                >
                  {status === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    {status === "success"
                      ? "Thank you for joining our waitlist!"
                      : errorMessage}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
          <div className="relative animate-fadeIn">
            <ProductCarousel />
            <div className="absolute -bottom-8 right-0 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-semibold text-accent">★ 4.9/5</p>
              <p className="text-sm text-muted-foreground">from 1000+ reviews</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <a
            href="#benefits"
            className="text-accent hover:text-primary transition-colors animate-bounce"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;