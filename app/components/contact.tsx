"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const CONTACT_DETAILS = [
  {
    icon: FiMapPin,
    label: "Studio",
    value: "412 Arbor Lane, Suite 3, Portland, OR 97209",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "studio@vredezara.com",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+1 (503) 555-0148",
  },
];

const SERVICE_OPTIONS = [
  "Landscape Architecture",
  "Biophilic Indoor Styling",
  "Premium Garden Stewardship",
  "Not sure yet",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Wire this up to your form handler / API route.
    setSubmitted(true);
  };

  const inputClasses =
    "w-full rounded-md border border-emerald-950/15 bg-white px-4 py-3 text-sm text-emerald-950 placeholder:text-emerald-950/40 focus:ring-2 focus:ring-emerald-700 focus:border-transparent outline-none transition-all";

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="contact-heading"
          className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
        >
          Start a conversation about your space
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-4"
          >
            <p className="text-emerald-950/70">
              Tell us about the site, and we'll arrange a walk-through with
              one of our lead designers within a week.
            </p>

            <ul className="mt-8 flex flex-col gap-6">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                  />
                  <div>
                    <p className="text-xs text-emerald-950/50">{label}</p>
                    <p className="text-sm text-emerald-950">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="md:col-span-8"
          >
            {submitted ? (
              <div
                role="status"
                className="rounded-md border border-emerald-700/30 bg-emerald-50 px-6 py-8 text-emerald-950"
              >
                <p className="font-[family-name:var(--font-fraunces)] text-lg">
                  Thank you — your note has reached us.
                </p>
                <p className="mt-2 text-sm text-emerald-950/70">
                  A designer will follow up at the email address you shared.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="mb-1.5 block text-sm text-emerald-950/80"
                  >
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    className={inputClasses}
                    placeholder="Jordan Ashworth"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm text-emerald-950/80"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={inputClasses}
                    placeholder="jordan@example.com"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="serviceType"
                    className="mb-1.5 block text-sm text-emerald-950/80"
                  >
                    Service type
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    defaultValue=""
                    className={`${inputClasses} appearance-none`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="projectVision"
                    className="mb-1.5 block text-sm text-emerald-950/80"
                  >
                    Project vision
                  </label>
                  <textarea
                    id="projectVision"
                    name="projectVision"
                    rows={5}
                    required
                    className={`${inputClasses} resize-none`}
                    placeholder="Tell us about the site, the season, and what you'd like it to become."
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-emerald-700 px-7 py-3.5 text-sm font-medium text-stone-50 transition-colors hover:bg-emerald-800 sm:w-auto"
                  >
                    Send consultation request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
