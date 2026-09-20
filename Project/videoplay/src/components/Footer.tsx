import { Mail, Phone, Send, MapPin, Heart } from 'lucide-react'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="  mt-10">
            <div className="max-w-main mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    <div className="flex flex-col gap-5">
                        <div>
                            <h2 className="text-2xl font-bold theme-text">
                                ShopHub
                            </h2>
                            <p className=" text-sm mt-1">Your Fashion Destination</p>
                        </div>
                        <p className=" text-sm leading-relaxed">
                            Discover trendy fashion collections for men and women. Quality, style, and comfort in every piece.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full theme-bg-lite hover:theme-bg hover: flex items-center justify-center theme-text transition-all duration-300 hover:scale-110 font-bold text-sm">
                                f
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full theme-bg-lite hover:theme-bg hover: flex items-center justify-center theme-text transition-all duration-300 hover:scale-110 font-bold text-sm">
                                𝕏
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full theme-bg-lite hover:theme-bg hover: flex items-center justify-center theme-text transition-all duration-300 hover:scale-110 font-bold text-sm">
                                IG
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full theme-bg-lite hover:theme-bg hover: flex items-center justify-center theme-text transition-all duration-300 hover:scale-110 font-bold text-sm">
                                in
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-bold ">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/products" className=" hover:theme-text transition-colors duration-300 text-sm">Products</a></li>
                            <li><a href="/products?gender=men" className=" hover:theme-text transition-colors duration-300 text-sm">Men's Collection</a></li>
                            <li><a href="/products?gender=women" className=" hover:theme-text transition-colors duration-300 text-sm">Women's Collection</a></li>
                            <li><a href="#" className=" hover:theme-text transition-colors duration-300 text-sm">About Us</a></li>
                            <li><a href="#" className=" hover:theme-text transition-colors duration-300 text-sm">Blog</a></li>
                            <li><a href="#" className=" hover:theme-text transition-colors duration-300 text-sm">Careers</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-bold ">Support</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 group">
                                <Phone size={16} className="theme-text mt-1 shrink-0" />
                                <div>
                                    <p className=" hover:theme-text transition-colors duration-300 text-sm cursor-pointer">+880 1XXX-XXXXXX</p>
                                    <p className="text-gray-500 text-xs">9AM - 12AM</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <Mail size={16} className="theme-text mt-1 shrink-0" />
                                <div>
                                    <p className=" hover:theme-text transition-colors duration-300 text-sm cursor-pointer">support@shophub.com</p>
                                    <p className="text-gray-500 text-xs">We respond within 24h</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 group">
                                <MapPin size={16} className="theme-text mt-1 shrink-0" />
                                <div>
                                    <p className=" text-sm">123 Fashion Street</p>
                                    <p className="text-gray-500 text-xs">Dhaka, Bangladesh</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-5">
                        <h3 className="text-lg font-bold ">Newsletter & Feedback</h3>
                        <p className=" text-sm">Subscribe to get special offers and latest updates, or share your feedback.</p>
                        <form className="flex flex-col gap-2">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full  rounded-lg  placeholder:text-gray-500 costem-input"
                                />
                            </div>
                            <textarea
                                placeholder="Share your feedback or message..."
                                rows={3}
                                className="w-full  rounded-lg  placeholder:text-gray-500 resize-none costem-input"
                            />
                            <button
                                type="submit"
                                className="w-full costem-input px-4 py-2.5 theme-bg  font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                                Subscribe & Send
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
                    <p className=" text-sm text-center md:text-left">
                        © ShopHub {currentYear} | All Rights Reserved | Developed with{' '}
                        <Heart size={14} className="inline theme-text" /> by{' '}
                        <span className="theme-text font-semibold">Team Mahal</span>
                    </p>
                    <div className="flex gap-6">
                        <a href="/privacy-policy" className=" hover:theme-text transition-colors duration-300 text-sm">Privacy Policy</a>
                        <a href="#" className=" hover:theme-text transition-colors duration-300 text-sm">Terms & Conditions</a>
                        <a href="#" className=" hover:theme-text transition-colors duration-300 text-sm">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer