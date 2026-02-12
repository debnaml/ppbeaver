import ContactTrigger from "./ContactTrigger";

type ContactSectionProps = {
  id?: string;
  heading?: string;
  className?: string;
};

export default function ContactSection({
  id = "contact",
  heading = "Ready to work smarter?",
  className = "",
}: ContactSectionProps) {
  const sectionClasses = [
    "contact-pattern relative flex min-h-screen items-center px-6 py-32 sm:px-12",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={sectionClasses}>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <h2
          className="text-4xl font-semibold text-[var(--color-cream)] sm:text-5xl lg:text-[5.5rem]"
          style={{
            fontFamily:
              "var(--font-syne), 'Syne', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            letterSpacing: "-1px",
          }}
        >
          {heading}
        </h2>
        <div className="mt-5">
          <ContactTrigger />
        </div>
      </div>
    </section>
  );
}
