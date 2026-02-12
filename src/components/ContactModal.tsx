"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useContactForm } from "@/hooks/useContactForm";

const fieldClasses =
  "block w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-[var(--color-cream)] outline-none transition placeholder:text-white/40 focus:border-[var(--color-highlight)] focus:bg-white/10";

const focusableSelectors = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelectors.join(","))
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.tabIndex !== -1 &&
      element.getAttribute("aria-hidden") !== "true"
  );
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const {
    formValues,
    errors,
    status,
    step,
    selectedOption,
    displayedOptions,
    incorrectOptionId,
    disableSubmit,
    setFieldValue,
    handleCheckHuman,
    handleSubmit,
    handleOptionSelect,
    handleGoBack,
  } = useContactForm({ isOpen, onClose });

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusable = getFocusableElements(dialog);
    (focusable[0] ?? dialog).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(dialog);
      if (!elements.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8">
      <div
        className="absolute inset-0 bg-[var(--color-supadark)]/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[32px] border-2 border-[#66f2d5] bg-gradient-to-b from-[var(--color-ink)] to-[var(--color-supadark)] shadow-2xl"
        ref={dialogRef}
        tabIndex={-1}
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
                    Check I&apos;m Human
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
                      onClick={() => handleOptionSelect(option.id)}
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
                    onClick={handleGoBack}
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
            onClick={onClose}
            aria-label="Close contact form"
          >
            &times;
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ContactModal;
