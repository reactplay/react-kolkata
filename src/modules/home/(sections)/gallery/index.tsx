"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";

const galleryImages = [
  { src: "/images/tech-events-1.jpg", alt: "Tech Event 1" },
  { src: "/images/tech-events-2.jpg", alt: "Tech Event 2" },
  { src: "/images/tech-events-3.jpg", alt: "Tech Event 3" },
  { src: "/images/kolkata-hero.jpg", alt: "Kolkata Hub" },
  { src: "/images/tech-events-1.jpg", alt: "Workshop" },
  { src: "/images/tech-events-2.jpg", alt: "Networking" },
];

const GallerySection = () => {
  const t = useTranslations("Gallery");

  return (
    <AnimatedSection>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-medium text-white">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default GallerySection;
