import Image from "next/image";

const menuItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#content" },
  { label: "Case Studies", href: "#content" },
  { label: "Contact Us", href: "#contact" },
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
        className="relative z-10 flex flex-col gap-4 text-2xl"
        style={{
          fontFamily:
            "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          marginTop: "2rem",
          marginBottom: "12rem",
        }}
      >
        {menuItems.map((item) => (
          <a key={item.label} href={item.href} className="transition hover:opacity-70">
            {item.label}
          </a>
        ))}
      </nav>

      <Image
        src="/logo-full.svg"
        alt="Performance Peak"
        width={240}
        height={120}
        className="pointer-events-none absolute"
        style={{
          left: edgeGap,
          bottom: "calc(5rem + 40px)",
          filter: "brightness(0) invert(1)",
          width: "240px",
          height: "auto",
        }}
        aria-hidden
      />

      <div className="absolute bottom-20 left-0 right-0 h-px bg-white/80 md:hidden" />

      <div
        className="absolute bottom-20 hidden h-px bg-white/90 md:block"
        style={{
          left: edgeGap,
          right: `calc(300px + ${edgeGap} - 60px)`,
        }}
      />

      <p
        className="absolute text-sm text-white/90"
        style={{
          left: edgeGap,
          bottom: "calc(2.25rem - 8px)",
          fontFamily:
            "var(--font-source-sans), 'Source Sans 3', 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        © 2026 Performance Peak (PP Worldwide). Company Number: 15037470
      </p>

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
