import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Triangle } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center">
          <Triangle className="h-6 w-6 fill-black" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm">
            Log In
          </Link>
          <Link href="/signup" className="text-sm">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Contact Us</h1>
            <p className="mt-2 text-gray-600">Fill out the form below and we'll get back to you.</p>
          </div>

          <form className="space-y-4" action="#" method="POST">
            <div>
              <Input type="text" name="name" id="name" placeholder="Your Name" required className="w-full" />
            </div>
            <div>
              <Input type="email" name="email" id="email" placeholder="Email Address" required className="w-full" />
            </div>
            <div>
              <Textarea
                name="message"
                id="message"
                placeholder="Your Message"
                required
                className="w-full min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
