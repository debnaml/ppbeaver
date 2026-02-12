'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  message: string;
  honeypot: string;
};

export type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type VerificationOption = {
  id: string;
  label: string;
  alt: string;
  imageSrc: string;
  isCorrect: boolean;
};

const defaultValues: ContactFormValues = {
  name: "",
  company: "",
  phone: "",
  email: "",
  message: "",
  honeypot: "",
};

const shuffleArray = <T,>(items: T[]): T[] => {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
};

export const verificationOptions: VerificationOption[] = [
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

type UseContactFormArgs = {
  isOpen: boolean;
  onClose: () => void;
};

export function useContactForm({ isOpen, onClose }: UseContactFormArgs) {
  const [formValues, setFormValues] = useState<ContactFormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [step, setStep] = useState<"form" | "verify">("form");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [displayedOptions, setDisplayedOptions] = useState<VerificationOption[]>(() => shuffleArray(verificationOptions));
  const [incorrectOptionId, setIncorrectOptionId] = useState<string | null>(null);
  const incorrectHighlightTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const disableSubmit = useMemo(() => status === "submitting", [status]);

  const cancelIncorrectHighlight = useCallback(() => {
    if (!incorrectHighlightTimeout.current) return;
    clearTimeout(incorrectHighlightTimeout.current);
    incorrectHighlightTimeout.current = null;
  }, []);

  const clearIncorrectHighlight = useCallback(() => {
    cancelIncorrectHighlight();
    setIncorrectOptionId(null);
  }, [cancelIncorrectHighlight]);

  const triggerIncorrectHighlight = useCallback(
    (optionId: string) => {
      cancelIncorrectHighlight();
      setIncorrectOptionId(optionId);
      incorrectHighlightTimeout.current = window.setTimeout(() => {
        setIncorrectOptionId((current) => (current === optionId ? null : current));
        incorrectHighlightTimeout.current = null;
      }, 2200);
    },
    [cancelIncorrectHighlight]
  );

  const refreshOptions = useCallback(() => {
    setDisplayedOptions(shuffleArray(verificationOptions));
  }, []);

  const resetForm = useCallback(() => {
    setFormValues(defaultValues);
    setErrors({});
    setStatus("idle");
    setStep("form");
    setSelectedOption("");
    clearIncorrectHighlight();
    refreshOptions();
  }, [clearIncorrectHighlight, refreshOptions]);

  useEffect(() => {
    if (!isOpen) return;
    resetForm();
  }, [isOpen, resetForm]);

  useEffect(() => {
    return () => {
      cancelIncorrectHighlight();
      if (submitTimeout.current) {
        clearTimeout(submitTimeout.current);
        submitTimeout.current = null;
      }
    };
  }, [cancelIncorrectHighlight]);

  const setFieldValue = useCallback((field: keyof ContactFormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((values: ContactFormValues): FormErrors => {
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
  }, []);

  const handleCheckHuman = useCallback(() => {
    const validationErrors = validate(formValues);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return false;
    }

    setStep("verify");
    return true;
  }, [formValues, validate]);

  const handleOptionSelect = useCallback(
    (optionId: string) => {
      clearIncorrectHighlight();
      setSelectedOption(optionId);
    },
    [clearIncorrectHighlight]
  );

  const handleGoBack = useCallback(() => {
    setStep("form");
    setSelectedOption("");
    clearIncorrectHighlight();
  }, [clearIncorrectHighlight]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
        refreshOptions();
        return;
      }

      clearIncorrectHighlight();
      setStatus("submitting");

      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setStatus("success");

        submitTimeout.current = window.setTimeout(() => {
          onClose();
          resetForm();
        }, 900);
      } catch (error) {
        setStatus("error");
        console.error("Contact form submission failed", error);
      }
    },
    [
      clearIncorrectHighlight,
      handleCheckHuman,
      onClose,
      refreshOptions,
      resetForm,
      selectedOption,
      step,
      triggerIncorrectHighlight,
    ]
  );

  return {
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
  } as const;
}
