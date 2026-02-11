"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  honeypot: string;
};

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

type VerificationOption = {
  id: string;
  label: string;
  alt: string;
  imageSrc: string;
  isCorrect: boolean;
};

const shuffleArray = <T,>(items: T[]): T[] => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
};

const defaultValues: ContactFormValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
  honeypot: "",
};

const fieldClasses =
  "block w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-[var(--color-cream)] outline-none transition placeholder:text-white/40 focus:border-[var(--color-highlight)] focus:bg-white/10";

const verificationOptions: VerificationOption[] = [
  {
    id: "beaver",
    label: "Beaver",
    alt: "Illustration of a beaver from the homepage hero",
    imageSrc: "/images/site-beaver.jpg",
    isCorrect: true,
  },
  {
    id: "fox",
    label: "Fox",
    alt: "Illustration of a fox",
    imageSrc: "/images/site-fox.jpg",
    isCorrect: false,
  },
  {
    id: "pig",
    label: "Pig",
    alt: "Illustration of a pig",
    imageSrc: "/images/site-pig.jpg",
    isCorrect: false,
  },
  {
    id: "croc",
    label: "Croc",
    alt: "Illustration of a crocodile",
    imageSrc: "/images/site-croc.jpg",
    isCorrect: false,
  },
];

export default function ContactModal() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<ContactFormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [displayedOptions, setDisplayedOptions] = useState<VerificationOption[]>(() => shuffleArray(verificationOptions));
  const [incorrectOptionId, setIncorrectOptionId] = useState<string | null>(null);
  const incorrectHighlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shuffleDisplayedOptions = () => {
    setDisplayedOptions(shuffleArray(verificationOptions));
  };

  const cancelIncorrectHighlightTimeout = () => {
    if (incorrectHighlightTimeout.current) {
      clearTimeout(incorrectHighlightTimeout.current);
      incorrectHighlightTimeout.current = null;
    }
  };

  const clearIncorrectHighlight = () => {
    cancelIncorrectHighlightTimeout();
    setIncorrectOptionId(null);
  };

  const triggerIncorrectHighlight = (optionId: string) => {
    cancelIncorrectHighlightTimeout();
    setIncorrectOptionId(optionId);
    incorrectHighlightTimeout.current = setTimeout(() => {
      setIncorrectOptionId((current) => (current === optionId ? null : current));
      incorrectHighlightTimeout.current = null;
    }, 2200);
  };

  useEffect(() => setIsMounted(true), []);

  useEffect(() => () => cancelIncorrectHighlightTimeout(), []);

  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMounted, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setStep("form");
    setSelectedOption("");
    clearIncorrectHighlight();
    shuffleDisplayedOptions();
    setStatus("idle");
    setFormValues(defaultValues);
    setErrors({});
  }, [isOpen]);

  const disableSubmit = useMemo(() => status === "submitting", [status]);

  const setFieldValue = (field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (values: ContactFormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Tell us a little about your project.";
    } else if (values.message.trim().length < 20) {
      nextErrors.message = "Give us at least 20 characters.";
    }

    if (values.honeypot.trim()) {
      nextErrors.honeypot = "Bot submission detected.";
    }

    return nextErrors;
  };

  const resetForm = () => {
    setFormValues(defaultValues);
    setErrors({});
    setStatus("idle");
    setStep("form");
    setSelectedOption("");
    clearIncorrectHighlight();
    shuffleDisplayedOptions();
  };

  const handleCheckHuman = () => {
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setStep("verify");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step !== "verify") {
      handleCheckHuman();
      return;
    }

    if (!selectedOption) {
      return;
    }

    const chosen = verificationOptions.find((option) => option.id === selectedOption);
    if (!chosen?.isCorrect) {
      triggerIncorrectHighlight(selectedOption);
      shuffleDisplayedOptions();
      return;
    }

    clearIncorrectHighlight();
    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");

      setTimeout(() => {
        setIsOpen(false);
        resetForm();
      }, 900);
    } catch (error) {
      setStatus("error");
      console.error("Contact form submission failed", error);
    }
  };

  const modal =
    isMounted && isOpen
      ? createPortal(
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8">
            <div className="absolute inset-0 bg-[var(--color-supadark)]/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border-2 border-[#66f2d5] bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-supadark)] shadow-2xl"
            >
              <div className="flex max-h-[90vh] flex-col gap-6 overflow-y-auto p-8 sm:p-12">
                <h3 id="contact-modal-title" className="sr-only">
                  Contact Performance Peak
                </h3>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <input
                    type="text"
                    name="feedback_channel"
                    tabIndex={-1}
                    autoComplete="new-password"
                    inputMode="none"
                    value={formValues.honeypot}
                    onChange={(event) => setFieldValue("honeypot", event.target.value)}
                    className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
                    aria-hidden
                  />

                  {step === "form" ? (
                    <>
                      <div className="gap-4 sm:grid sm:grid-cols-2 sm:space-y-0">
                        <div className="space-y-1">
                          <label htmlFor="contact-name" className="text-sm font-medium text-white/80">
                            Name*
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formValues.name}
                            onChange={(event) => setFieldValue("name", event.target.value)}
                            className={fieldClasses}
                            placeholder="Name"
                            required
                          />
                          {errors.name && <p className="text-sm text-[#FF9B9B]">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="contact-company" className="text-sm font-medium text-white/80">
                            Company
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            name="company"
                            autoComplete="organization"
                            value={formValues.company}
                            onChange={(event) => setFieldValue("company", event.target.value)}
                            className={fieldClasses}
                            placeholder="Company"
                          />
                        </div>
                      </div>

                      <div className="gap-4 sm:grid sm:grid-cols-2 sm:space-y-0">
                        <div className="space-y-1">
                          <label htmlFor="contact-phone" className="text-sm font-medium text-white/80">
                            Contact number
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            value={formValues.phone}
                            onChange={(event) => setFieldValue("phone", event.target.value)}
                            className={fieldClasses}
                            placeholder="Contact number"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="contact-email" className="text-sm font-medium text-white/80">
                            Email*
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={formValues.email}
                            onChange={(event) => setFieldValue("email", event.target.value)}
                            className={fieldClasses}
                            placeholder="Email"
                            required
                          />
                          {errors.email && <p className="text-sm text-[#FF9B9B]">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label htmlFor="contact-message" className="text-sm font-medium text-white/80">
                          What should we know?*
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          rows={5}
                          value={formValues.message}
                          onChange={(event) => setFieldValue("message", event.target.value)}
                          className={`${fieldClasses} resize-none leading-relaxed`}
                          placeholder="What should we know?"
                          required
                        />
                        {errors.message && <p className="text-sm text-[#FF9B9B]">{errors.message}</p>}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-2">
                        <p className="text-xs text-white/60">*Required fields</p>
                        <button
                          type="button"
                          onClick={handleCheckHuman}
                          className="pp-button inline-flex items-center rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-8 py-4 text-base font-semibold text-[var(--color-ink)] backdrop-blur transition hover:brightness-110"
                        >
                          Check I'm Human
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-white">Who did you see on the homepage hero?</p>

                      <div className="grid gap-3 sm:grid-cols-2 sm:justify-items-center">
                        {displayedOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => {
                              clearIncorrectHighlight();
                              setSelectedOption(option.id);
                            }}
                            className={`group w-full max-w-[220px] overflow-hidden rounded-2xl border transition ${selectedOption === option.id ? "border-[var(--color-highlight)] bg-white/10" : "border-white/10 bg-white/5 hover:border-white/30"}`}
                            aria-pressed={selectedOption === option.id}
                          >
                            <div className="relative aspect-square w-full">
                              <img src={option.imageSrc} alt={option.alt} className="h-full w-full object-cover" />
                              {incorrectOptionId === option.id && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(8,0,0,0.55)]">
                                  <span className="text-5xl font-black text-[#FF6B6B]">×</span>
                                </div>
                              )}
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[rgba(0,0,0,0.45)] px-4 py-2 text-left">
                                <p className="text-base font-semibold text-[var(--color-cream)]">{option.label}</p>
                                <span className={`text-xs uppercase tracking-[0.2em] ${selectedOption === option.id ? "text-[var(--color-highlight)]" : "text-white/60"}`}>
                                  {selectedOption === option.id ? "Selected" : "Choose"}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-2">
                        <button
                          type="button"
                          className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
                          onClick={() => {
                            setStep("form");
                            setSelectedOption("");
                            clearIncorrectHighlight();
                          }}
                        >
                          Go back
                        </button>
                        <button
                          type="submit"
                          className="pp-button inline-flex items-center rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-8 py-4 text-base font-semibold text-[var(--color-ink)] backdrop-blur transition hover:brightness-110 disabled:opacity-60"
                          disabled={disableSubmit}
                        >
                          {status === "submitting" ? "Sending" : "Send details"}
                        </button>
                      </div>
                    </>
                  )}

                </form>

                <button
                  type="button"
                  className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/70 transition hover:text-white"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close contact form"
                >
                  &times;
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          aria-label="Open contact form"
          className="pp-button inline-flex items-center rounded-full border border-white/20 bg-[var(--color-highlight)]/85 px-8 py-4 text-base font-semibold text-[var(--color-ink)] backdrop-blur transition hover:brightness-110"
          onClick={() => setIsOpen(true)}
        >
          Let's talk
        </button>
        <p className="text-sm text-white/60" style={{ marginTop: "15px" }}>
          Prefer email? <span className="text-[#66f2d5] underline">hello@performancepeak.com</span>
        </p>
      </div>
      {modal}
    </>
  );
}
