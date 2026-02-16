import Image from "next/image";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact Us", href: "/#contact" },
];

const edgeGap = "clamp(2rem, 5vw, 5rem)";

const Footer = () => {
  return (
    <footer
      className="relative isolate w-full text-white"
      style={{
        backgroundColor: "#13C390",
        minHeight: "560px",
        paddingLeft: edgeGap,
        paddingRight: edgeGap,
        paddingTop: "3rem",
        paddingBottom: "4rem",
      }}
    >
      <nav
        className="relative z-10 mt-8 mb-40 flex max-w-[22rem] flex-col gap-6 font-heading text-2xl md:max-w-none"
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="transition hover:opacity-70">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-base uppercase tracking-[0.2em] text-white/80">
          <a href="/privacy" className="transition hover:text-white">
            Privacy
          </a>
          <a href="/cookies" className="transition hover:text-white">
            Cookies
          </a>
          <a href="/terms" className="transition hover:text-white">
            Terms
          </a>
        </div>
      </nav>

      <div className="mt-16 flex flex-col gap-5 pb-5 md:hidden">
        <Image
          src="/logo-full.svg"
          alt="Performance Peak"
          width={220}
          height={110}
          className="w-48"
          style={{ filter: "brightness(0) invert(1)", height: "auto" }}
        />
        <div className="h-px w-full bg-white/80" />
        <p className="font-body text-sm text-white/90">
          © 2026 Performance Peak (PP Worldwide). Company Number: 15037470
        </p>
      </div>

      <Image
        src="/logo-full.svg"
        alt="Performance Peak"
        width={240}
        height={120}
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: edgeGap,
          bottom: "60px",
          filter: "brightness(0) invert(1)",
          width: "240px",
          height: "auto",
        }}
        aria-hidden
      />

      <p
        className="font-body hidden text-sm text-white/90 md:absolute md:block"
        style={{
          left: edgeGap,
          bottom: "20px",
        }}
      >
        © 2026 Performance Peak (PP Worldwide). Company Number: 15037470
      </p>

      <div
        className="absolute hidden h-px bg-white/90 md:block"
        style={{
          left: edgeGap,
          right: `calc(300px + ${edgeGap} - 60px)`,
          bottom: "40px",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden md:block"
        style={{ transform: "translateY(2px)" }}
        aria-hidden
      >
        <Image
          src="/logo.svg"
          alt="Performance Peak icon"
          width={300}
          height={120}
          className="block w-[300px]"
          style={{
            filter: "brightness(0) invert(1)",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute right-0 top-0"
        style={{
          width: "700px",
          transform: "translateY(-8px) rotate(180deg)",
          transformOrigin: "center",
          opacity: 0.05,
        }}
        aria-hidden
      >
        <Image
          src="/logo.svg"
          alt="Performance Peak shadow icon"
          width={700}
          height={280}
          className="block w-full"
          style={{ filter: "brightness(0)" }}
        />
      </div>
    </footer>
  );
};

export default Footer;
