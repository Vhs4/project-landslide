import { Button } from '@/components/ui/button'
import { ShoppingBag, ArrowRight, CheckCircle, TrendingUp, Users, Mail } from "lucide-react"

const MarketPlace = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black items-center">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
          <ShoppingBag className="h-6 w-6 mr-2" />
          <span className="text-lg font-bold">Minimalist Market</span>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Minimalist Market
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-2xl">
                  Simplify your shopping experience. Find what you need, effortlessly.
                </p>
              </div>
              <Button className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                Explore Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
              Why Choose Minimalist Market?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-2 border p-6">
                <CheckCircle className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium">Quality Assurance</h3>
                <p className="text-sm text-gray-500 text-center">All products are carefully curated and quality-checked.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6">
                <TrendingUp className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium">Trending Items</h3>
                <p className="text-sm text-gray-500 text-center">Stay up-to-date with the latest market trends and popular products.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6">
                <Users className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-medium">Community-Driven</h3>
                <p className="text-sm text-gray-500 text-center">Join a community of like-minded shoppers and sellers.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex flex-col items-center space-y-2 border p-4 bg-white">
                  <div className="w-full h-48 bg-gray-200" />
                  <h3 className="text-xl font-medium">Product {i}</h3>
                  <p className="text-sm text-gray-500 text-center">A minimalist description for product {i}.</p>
                  <Button variant="outline">View Details</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Alex", comment: "Minimalist Market has simplified my online shopping experience. I love it!" },
                { name: "Sam", comment: "The quality of products on this platform is consistently high. Highly recommended." },
                { name: "Jordan", comment: "As a seller, I've found Minimalist Market to be user-friendly and effective." },
              ].map((testimonial, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 border p-6">
                  <p className="text-sm text-gray-500 text-center italic">"{testimonial.comment}"</p>
                  <p className="text-sm font-medium">- {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Join Our Marketplace
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Start selling your products today. Reach more customers with our simple platform.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col space-y-4">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your email"
                    type="email"
                  />
                  <Button type="submit" className="w-full">
                    Get Started
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2023 Minimalist Market. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default MarketPlace