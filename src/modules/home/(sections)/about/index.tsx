"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Calendar, LucideIcon, Target, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/custom/animated-section";
import { features } from "@/base/constants/site";

interface HighlightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass?: "blue" | "purple" | "amber";
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -8 },
};

// Reusable Highlight Card Component
const HighlightCard = ({
  icon: Icon,
  title,
  description,
  colorClass = "blue",
}: HighlightCardProps) => {
  const shadowClasses = {
    blue: "hover:shadow-blue-500/10",
    purple: "hover:shadow-purple-500/10",
    amber: "hover:shadow-amber-500/10",
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover="hover"
      initial="rest"
      className={`group rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-lg ${shadowClasses[colorClass]}`}
    >
      <motion.div className="flex items-start gap-4" variants={scaleOnHover}>
        <motion.div
          className="rounded-lg bg-gradient-to-br from-blue-500/15 to-sky-400/15 p-2.5"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-sky-400" />
        </motion.div>
        <div className="flex-1">
          <h3
            className="mb-2 text-lg font-semibold text-slate-100"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h3>
          <p className="text-sm leading-relaxed font-light text-slate-300">{description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="mb-3 flex items-center gap-3">
        <motion.div
          className="rounded-lg bg-gradient-to-br from-blue-500/20 to-sky-400/20 p-2.5"
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-5 w-5 text-sky-300" />
        </motion.div>
        <h4
          className="text-base font-semibold text-slate-100"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {title}
        </h4>
      </div>
      <p className="text-sm leading-relaxed font-light text-slate-300">{description}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  const t = useTranslations("About");

  const scrollToEvents = () => {
    const eventsSection = document.getElementById("events-section");
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const featureKeys = [
    "technical_workshops",
    "community_meetups",
    "lightning_talks",
    "project_showcases",
    "mentorship_program",
    "open_source",
  ];

  return (
    <AnimatedSection className="relative">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-sky-300"
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-sky-400"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Google Developer Groups on Campus
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-4xl font-bold text-slate-100 sm:text-5xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-base leading-relaxed font-light text-slate-300 sm:text-lg"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-24"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <HighlightCard
              icon={Target}
              title={t("mission.title")}
              description={t("mission.description")}
              colorClass="blue"
            />
            <HighlightCard
              icon={BadgeCheck}
              title={t("values.title")}
              description={t("values.description")}
              colorClass="purple"
            />
            <HighlightCard
              icon={Zap}
              title={t("impact.title")}
              description={t("impact.description")}
              colorClass="amber"
            />
          </div>
        </motion.div>

        {/* What We Do Section */}
        <div className="mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.h3
              variants={fadeInUp}
              className="mb-4 text-3xl font-bold text-slate-100 sm:text-4xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {t("what_we_do")}
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-base font-light text-slate-300 sm:text-lg"
            >
              {t("what_we_do_description")}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const featureKey = featureKeys[index];

              return (
                <FeatureCard
                  key={feature.title}
                  icon={Icon}
                  title={t(`features.${featureKey}.title`)}
                  description={t(`features.${featureKey}.description`)}
                />
              );
            })}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-sky-600/20"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 200%" }}
          />
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

          {/* Content */}
          <div className="relative z-10 rounded-2xl border border-white/10 p-8 text-center sm:p-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-sky-400/20"
            >
              <Calendar className="h-8 w-8 text-sky-300" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-4 text-2xl font-bold text-slate-100 sm:text-3xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Join Our Next Event! 🚀
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mx-auto mb-8 max-w-2xl text-base font-light text-slate-300 sm:text-lg"
            >
              Be part of our growing community and start making an impact in tech. Developers of all
              levels are welcome!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.button
                onClick={scrollToEvents}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-sky-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-sky-600 hover:shadow-lg hover:shadow-blue-500/30"
              >
                View Upcoming Events
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                Join the Community
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
