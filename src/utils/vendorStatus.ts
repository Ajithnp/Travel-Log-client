export function getVerificationButtonLabel(status?: string) {
  if (status === "Pending") return "Request Verification";
  if (status === "Rejected") return "Request Again";
  return "Request Verification";
}
