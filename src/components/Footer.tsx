const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Glow Oil</h3>
            <p className="text-accent-foreground/80">
              Premium facial oil for natural beauty.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#benefits"
                  className="text-accent-foreground/80 hover:text-accent-foreground"
                >
                  Benefits
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-accent-foreground/80 hover:text-accent-foreground"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-accent-foreground/80 hover:text-accent-foreground"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-accent-foreground/80 hover:text-accent-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-accent-foreground/80 hover:text-accent-foreground"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-accent-foreground/80">
              Email: hello@glowoil.com
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-accent-foreground/20 text-center text-accent-foreground/60">
          <p>&copy; 2024 Glow Oil. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;