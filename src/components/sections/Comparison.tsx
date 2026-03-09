"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { COMPARISON_ROWS } from "@/lib/constants";

export default function Comparison() {
  return (
    <section className="bg-sendara-off-white py-20 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel>WHY SENDARA</SectionLabel>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-sendara-navy mt-4">
            Not another generic messaging tool.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-6 font-heading font-semibold text-sendara-navy">Feature</th>
                  <th className="text-center py-4 px-6 font-heading font-semibold text-sendara-teal">Sendara</th>
                  <th className="text-center py-4 px-6 font-heading font-semibold text-sendara-navy/50">Generic Tools</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => {
                  const isNegativeFeature = row.feature === "CRM Lock-in" || row.feature === "Long-term Contract";
                  return (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-sendara-off-white/50"}>
                      <td className="py-3.5 px-6 font-body text-sm text-sendara-navy">{row.feature}</td>
                      <td className="py-3.5 px-6 text-center">
                        {isNegativeFeature ? (
                          row.sendara ? (
                            <X className="inline text-danger" size={18} />
                          ) : (
                            <Check className="inline text-success" size={18} />
                          )
                        ) : (
                          row.sendara ? (
                            <Check className="inline text-success" size={18} />
                          ) : (
                            <X className="inline text-danger" size={18} />
                          )
                        )}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {isNegativeFeature ? (
                          row.generic ? (
                            <X className="inline text-danger" size={18} />
                          ) : (
                            <Check className="inline text-success" size={18} />
                          )
                        ) : (
                          row.generic ? (
                            <Check className="inline text-success" size={18} />
                          ) : (
                            <X className="inline text-sendara-navy/20" size={18} />
                          )
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {COMPARISON_ROWS.map((row) => {
              const isNegativeFeature = row.feature === "CRM Lock-in" || row.feature === "Long-term Contract";
              return (
                <div key={row.feature} className="bg-white rounded-xl p-4 flex items-center justify-between">
                  <span className="font-body text-sm text-sendara-navy">{row.feature}</span>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-[10px] text-sendara-teal font-medium mb-1">Sendara</div>
                      {isNegativeFeature ? (
                        !row.sendara ? <Check className="mx-auto text-success" size={16} /> : <X className="mx-auto text-danger" size={16} />
                      ) : (
                        row.sendara ? <Check className="mx-auto text-success" size={16} /> : <X className="mx-auto text-danger" size={16} />
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-sendara-navy/40 font-medium mb-1">Others</div>
                      {isNegativeFeature ? (
                        !row.generic ? <Check className="mx-auto text-success" size={16} /> : <X className="mx-auto text-danger" size={16} />
                      ) : (
                        row.generic ? <Check className="mx-auto text-success" size={16} /> : <X className="mx-auto text-sendara-navy/20" size={16} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
