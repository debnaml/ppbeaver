import BeaverStamp from "./BeaverStamp";
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
    "contact-pattern bg-grain relative flex min-h-screen items-center px-6 py-32 sm:px-12",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} data-morph-bg="#292D40" className={sectionClasses}>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <BeaverStamp />
        <h2
          className="font-heading text-4xl font-semibold text-[var(--color-cream)] tracking-[-1px] sm:text-5xl lg:text-[5.5rem]"
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
