export const policies = [
  {
    value: "Flexible",
    label: "Flexible",
    tagline: "Maximum flexibility for travelers",
    color: "green",
    points: [
      "90% refund if cancelled 5 or more days before trip",
      "50% refund if cancelled 3–4 days before trip",
      "No refund if cancelled within 3 days of trip",
    ],
  },
  {
    value: "Moderate",
    label: "Moderate",
    tagline: "Balanced refund protection",
    color: "amber",
    points: [
      "80% refund if cancelled 7 or more days before trip",
      "50% refund if cancelled 5–6 days before trip",
      "No refund if cancelled within 5 days of trip",
    ],
  },
  {
    value: "Strict",
    label: "Strict",
    tagline: "Limited refund eligibility",
    color: "red",
    points: [
      "70% refund if cancelled 12 or more days before trip",
      "30% refund if cancelled 7–11 days before trip",
      "No refund if cancelled within 7 days of trip",
    ],
  },
  {
    value: "Non-Refundable",
    label: "Non-Refundable",
    tagline: "Best price — no cancellation refund",
    color: "red",
    points: [
      "No refund at any time after booking",
      "Recommended only for confirmed travelers",
      "Lower price compared to refundable options",
    ],
  },
] as const;

export type CancellationPolicies = 'Flexible' | 'Moderate' | 'Strict' | 'Non-Refundable';